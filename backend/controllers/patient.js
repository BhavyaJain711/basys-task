import Patient from "../models/patient.js";
import MedicalHistory from "../models/medicalHistory.js";
import AuthorizationRequest from "../models/authorization.js";

export async function getPatients(req, res) {
    try {
        const { page = 1, limit = 10, search = '', gender, minAge, maxAge } = req.query;
        let searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

        // Add gender filter if selected
        if (gender) {
            searchQuery.gender = gender;
        }

        // Add age range filter if specified
        if (minAge && maxAge) {
            searchQuery.age = { $gte: Number(minAge), $lte: Number(maxAge) };
        } else if (minAge) {
            searchQuery.age = { $gte: Number(minAge) };
        } else if (maxAge) {
            searchQuery.age = { $lte: Number(maxAge) };
        }

        const patients = await Patient.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select('-userId -medicalHistory -priorAuthRequests')

        const total = await Patient.countDocuments(searchQuery); // Total patients for pagination

        res.json({
            data: patients,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPatients: total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients' });
    }
}

export const addMedicalHistory = async (req, res) => {
    const { patientId, condition, treatment, medications, labResults, notes } = req.body;

    try {
        // Check if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Create new medical history record
        const newMedicalHistory = new MedicalHistory({
            patientId,
            condition,
            treatment,
            medications,
            labResults,
            notes,
        });

        // Save medical history to DB
        await newMedicalHistory.save();

        // Add the medical history reference to the patient's record
        patient.medicalHistory.push(newMedicalHistory._id);
        await patient.save();

        res.status(201).json({ message: "Medical history added successfully", medicalHistory: newMedicalHistory });
    } catch (error) {
        res.status(500).json({ message: "Error adding medical history", error });
        console.error("Error adding medical history:", error);
    }
};

export const getMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        // Find all medical history entries for the given patientId
        const history = await MedicalHistory.find({ patientId: id });

        if (!history) {
            return res.status(404).json({ message: 'No medical history found for this patient.' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching medical history:', error);
        res.status(500).json({ message: 'Error fetching medical history.' });
    }
};

export const submitAuthorization = async (req, res) => {
    const { patientId } = req.params;
    const { treatment, insurancePlan, dateOfService, diagnosisCode, doctorNotes } = req.body;

    try {
        // Create a new authorization request
        const authorizationRequest = new AuthorizationRequest({
            patientId,
            treatment,
            insurancePlan,
            dateOfService,
            diagnosisCode,
            doctorNotes,
        });

        // Save the request to the database
        const newAuth=await authorizationRequest.save();

        // Add the authorization request reference to the patient's record
        const patient = await Patient.findById(patientId);
        patient.priorAuthRequests.push(newAuth._id);
        await patient.save();

        return res.status(201).json({
            message: 'Authorization form submitted successfully',
            authorizationRequest,
        });
    } catch (error) {
        console.error('Error submitting authorization request:', error);
        return res.status(500).json({
            message: 'Failed to submit authorization form',
            error: error.message,
        });
    }
};

export const getPatientDetailsDoc = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);

        // Find patient by userId and populate related fields (medical history, prior authorizations)
        const patient = await Patient.findOne({ _id:userId })
            .populate('medicalHistory')
            .populate('priorAuthRequests');

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getPatientDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find patient by userId and populate related fields (medical history, prior authorizations)
        const patient = await Patient.findOne({ userId })
            .populate('medicalHistory')
            .populate('priorAuthRequests');

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};