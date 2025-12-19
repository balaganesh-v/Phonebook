import { decodedToken } from "../utils/security.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
    try {
        // 1. Get token from cookie or header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

        // 2. Decode token
        const decoded = decodedToken(token); // should return { id: userId }
        if (!decoded?.id) return res.status(401).json({ message: "Invalid token" });

        // 3. Find user
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });

        // 4. Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
