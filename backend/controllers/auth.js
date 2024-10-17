import bcrypt from "bcrypt";
import User from "../models/user.js";
import Patient from "../models/patient.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const {password, email, name, age,gender } = req.body;

    // Check if the user already exists
    const user= await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        role: "user"
    });

    const registeredUser= await newUser.save();

    await new Patient({
        userId: registeredUser._id,
        age,
        name,
        gender
    }).save();

    
    res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error}" }); 
  }

}
export async function registerDoctor(req, res) {
  try {
    const {password, email, name} = req.body;

    // Check if the user already exists
    const user= await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        role: "doctor"
    });

    await newUser.save();
    res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error}" }); 
  }

}

export async function login(req, res) {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }
    if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id,role:user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
    const refreshToken = jwt.sign({id: user._id,role:user.role}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'});
    res.status(200).json({token, refreshToken,role:user.role});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error}" }); 
  }
}