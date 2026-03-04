import { registerNewUser, loginUser } from "../services/userAuthService.js";

//Authentication Details are implemented here
export const register = async (req, res, next) => {
    try {
        const result = await registerNewUser(req);
        if (result.token) {
            // proxy ensures same-origin, so Lax is safe and works with HTTP
            res.cookie("token", result.token, {
                httpOnly: true,
                sameSite: "Lax", // simple policy now that everything appears same-site
                secure: false, // true in production (HTTPS)
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        }
        return res.status(result.status).json(result.body);
    } catch (error) {
        next(error);
    }
};

//LOGIN Details are implemented here
export const login = async (req, res, next) => {
    try {
        const result = await loginUser(req);
        if (result.token) {
            // also use Lax for register handler
            res.cookie("token", result.token, {
                httpOnly: true,
                sameSite: "Lax",
                secure: false, // true in production with HTTPS
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
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
        // clear cookie using Lax as well (sameSite policy does not affect clearing)
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,    // must be false for HTTP localhost
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};