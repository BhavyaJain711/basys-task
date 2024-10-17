import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next)=>{
    try {
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}

export const verifyUserRole = async (req,res,next)=>{
    try {
        const {role}= req.user;
        if(role!=="user") return res.status(403).json({error:"Access Denied"});
        next();
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}
export const verifyDoctorRole = async (req,res,next)=>{
    try {
        const {role}= req.user;
        if(role!=="doctor") return res.status(403).json({error:"Access Denied"});
        next();
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}
