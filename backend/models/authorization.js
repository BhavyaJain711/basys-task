import mongoose from 'mongoose';

const authorizationSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    treatment: {
        type: String,
        required: true
    },
    insurancePlan: {
        type: String,
        required: true
    },
    dateOfService: {
        type: Date,
        default: Date.now

    },
    diagnosisCode: {
        type: String,
        required: true
    },
    doctorNotes: {
        type: String,
        default: 'None'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
}, {
    timestamps: true
});

const AuthorizationRequest = mongoose.model('AuthorizationRequest', authorizationSchema);

export default AuthorizationRequest;