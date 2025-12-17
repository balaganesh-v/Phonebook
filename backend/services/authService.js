import { findUserByEmailOrPhone } from "../repositories/userRepository.js";
import { generateToken, hashPassword } from "../utils/security.js";
import { comparePassword } from "../utils/security.js";
import { sendLoginEmail } from "../utils/email.js";

// Service:phonebook Business logic //

// Register a new user
const register = async (data) => {
    const { name, email, phone, password } = data;

    //chechks for required fields
    if (!name || !email || !phone || !password) {
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await findUserByEmailOrPhone(email, phone);
    if (existingUser){
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await userRepository.createUser({
        name,
        email,
        phone,
        password: hashedPassword
    });

    // Generate JWT
    const token = generateToken({ id: user._id });

    return { token, user };
};

const login = async (data) => {

    const { email, phone, password } = data;

    const user = await findUserByEmailOrPhone(email, phone);

    if(!user){
        throw new Error("Invalid credentials by email or phone");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch){
        throw new Error("Invalid credentials by password");
    }

    // Generate JWT
    const token = generateToken({ id: user._id });

    // Send login email (non-blocking recommended)
    await sendLoginEmail(user.email, user.name);
    
    return { token, user };
};

export default {
    register,
    login
};
