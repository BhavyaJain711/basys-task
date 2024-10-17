import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import patientRoutes from "./routes/patients.js";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authRoutes);
app.use('/patients',patientRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});