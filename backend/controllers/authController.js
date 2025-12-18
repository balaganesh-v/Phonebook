import authService from "../services/userService.js";

export const register = async (req, res) => {
    try {
        const result = await authService.register(req.body, res);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await authService.login(req.body, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default {
    register,
    login
};
