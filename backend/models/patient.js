import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['male','female','other'],
        required: true
    },
    // doctorId:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     default: null
    // }],
    age: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        default: 'None'
    },
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalHistory',
        default: []
    }],
    priorAuthRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorizationRequest',
        default: []
    }]
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;