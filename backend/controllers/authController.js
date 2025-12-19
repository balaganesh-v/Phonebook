import { registerNewUser, loginUser } from "../services/userService.js";

export const register = async (req, res, next) => {
    try {
        const result = await registerNewUser(req.body, res);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await loginUser(req.body, res);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try{
        const user = req.user; // Assuming user is attached to req in auth middleware
        res.status(200).json({ user });
    }catch(error){
        next(error);
    }
};