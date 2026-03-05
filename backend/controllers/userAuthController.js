import { registerNewUser, loginUser } from "../services/userAuthService.js";

const getCookieOptions = () => ({
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
});

export const register = async (req, res, next) => {
    try {
        const result = await registerNewUser(req);
        if (result.token) {
            res.cookie("token", result.token, getCookieOptions());
        }
        return res.status(result.status).json(result.body);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await loginUser(req);
        if (result.token) {
            res.cookie("token", result.token, getCookieOptions());
        }
        return res.status(result.status).json(result.body);
    } catch (error) {
        next(error);
    }
};

export const profile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", getCookieOptions());
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};