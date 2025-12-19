import { decodedToken } from "../utils/security.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        const decoded = decodedToken(token);
        const user = await User.findById(decoded.id);
        if (!user) throw new Error("User not found");

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
