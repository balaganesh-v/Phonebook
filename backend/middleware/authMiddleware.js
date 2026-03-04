import { decodedToken } from "../utils/security.js";
import User from "../models/Users.js";

export const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if (!token){
            return res.status(401).json({ message: "Unauthorized: No token" });
        }

        const decoded = decodedToken(token); // should return { id: userId }
        if (!decoded?.id){
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user){
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
