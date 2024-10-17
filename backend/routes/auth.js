import { Router } from "express";
import { login, registerUser, registerDoctor } from "../controllers/auth.js";

const router = Router();

router.post("/login",login);

router.post("/register",registerUser);

router.post('/doctor/register',registerDoctor);

export default router;
