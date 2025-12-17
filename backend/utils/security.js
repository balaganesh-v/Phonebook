import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    }catch(error){
        throw new Error("Error hashing password");
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try{
        return await bcrypt.compare(password, hashedPassword);
    }catch(error){
        throw new Error("Error comparing passwords");
    }
};

export const generateToken = (payload) => {
    try{
        return jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: "7d" });
    }catch(error){
        throw new Error("Error generating token");
    }
};

export const verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch(error){
        throw new Error("Invalid token");
    }
};

export default {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};