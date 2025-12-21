import userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword, generateToken } from "../utils/security.js";

export const registerNewUser = async (data, res) => {
    try {
        const { name, email, phone, password } = data;

        if (!name || !email || !phone || !password) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            throw err;
        }

        const existingUser = await userRepository.findByEmailOrPhone(email, phone);
        if (existingUser) {
            const err = new Error("User already exists");
            err.statusCode = 409;
            throw err;
        }

        const hashedPassword = await hashPassword(password);

        const user = await userRepository.createUser({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        const token = generateToken({ id: user._id });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        };
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (data, res) => {
    try {
        const { phone, password } = data;

        if (!phone || !password) {
            const err = new Error("Phone and password are required");
            err.statusCode = 400;
            throw err;
        }

        const user = await userRepository.findByPhone(phone);
        if (!user) {
            const err = new Error("Invalid phone number");
            err.statusCode = 401;
            throw err;
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            const err = new Error("Invalid password");
            err.statusCode = 401;
            throw err;
        }

        const token = generateToken({ id: user._id });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
            },
        };
    } catch (error) {
        throw error;
    }
};
