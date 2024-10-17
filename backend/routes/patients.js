import { Router } from "express";
import { getPatients,addMedicalHistory,getMedicalHistory, submitAuthorization, getPatientDetails, getPatientDetailsDoc } from "../controllers/patient.js";
import { verifyToken } from "../middleware/auth.js";
const router= Router();

router.get('/all',verifyToken,getPatients);
router.get('/details',verifyToken,getPatientDetails);
router.get('/:userId',verifyToken,getPatientDetailsDoc);

router.post('/medicalHistory',verifyToken,addMedicalHistory);
router.get('/medical-history/:id',verifyToken,getMedicalHistory);
router.post('/authorization/:patientId',verifyToken, submitAuthorization);

export default router;