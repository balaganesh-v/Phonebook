import { verifyToken } from "../utils/security.js";

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
