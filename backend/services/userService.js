import { findUserByEmailOrPhone } from "../repositories/userRepository.js";
import { generateToken, hashPassword, comparePassword } from "../utils/security.js";
import { sendLoginEmail } from "../utils/email.js";
import userRepository from "../repositories/userRepository.js";


const register = async (data, res) => {
    const { name, email, phone, password } = data;

    if (!name || !email || !phone || !password) {
        throw new Error("All fields are required");
    }

    const existingUser = await findUserByEmailOrPhone(email, phone);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUser({
        name,
        email,
        phone,
        password: hashedPassword
    });

    const token = generateToken({ id: user._id });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return { user , token };
};

const login = async (data, res) => {
    const { email, phone, password } = data;

    const user = await findUserByEmailOrPhone(email, phone);
    if (!user){
        throw new Error("Invalid credentials by email or phone");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch){
        throw new Error("Invalid password");
    }

    const token = generateToken({ id: user._id, email: user.email });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    await sendLoginEmail(user.email, user.name); // Non-blocking

    return { user,token };
};

export default {
    register,
    login
};
