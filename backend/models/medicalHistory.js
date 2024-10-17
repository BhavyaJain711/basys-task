import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    condition: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        default: 'None'
    },
    medications:{
        type: Array,
        default: []
    },
    labResults: {
        type: Array,
        default: []
    },
    notes:{
        type: String,
        default: 'None'
    }
}, {
    timestamps: true
});

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);

export default MedicalHistory;
