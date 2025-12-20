import userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword, generateToken } from "../utils/security.js";

export const registerNewUser = async (data, res) => {
    const { name, email, phone, password } = data;

    if (!name || !email || !phone || !password) {
        throw new Error("All fields are required");
    }

    // ✅ Correct repository method name
    const existingUser = await userRepository.findByEmailOrPhone(email, phone);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUser({
        name,
        email,
        phone,
        password: hashedPassword
    });

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None", // allows cross-origin localhost requests
        secure: false,    // must be false for HTTP localhost
        maxAge: 7 * 24 * 60 * 60 * 1000
    });



    return { user, token };
};

export const loginUser = async (data, res) => {
    const { phone, password } = data;

    // ✅ Login only by phone
    const user = await userRepository.findByPhone(phone);
    if (!user) {
        throw new Error("Invalid phone number");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None", // allows cross-origin localhost requests
        secure: false,    // must be false for HTTP localhost
        maxAge: 7 * 24 * 60 * 60 * 1000
    });



    return { user, token };
};
