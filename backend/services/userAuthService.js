import {
    findByEmailOrPhone,
    findByPhone,
    createUser
} from "../repositories/userAuthRepository.js"
import { hashPassword, generateToken, comparePassword } from "../utils/security.js";


export const registerNewUser = async (req) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !phone || !password) {
            return {
                status: 400,
                body: { success: false, message: "All fields are required" }
            };
        }

        // Check if user with same email or phone already exists
        const existingUser = await findByEmailOrPhone(email, phone);
        if (existingUser) {
            return {
                status: 409,
                body: { success: false, message: "User already exists" }
            };
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Create new user
        const user = await createUser({
            name,
            email,
            phone,
            password: hashedPassword
        });

        // Generate JWT Token
        const token = generateToken({ id: user._id });

        return {
            status: 201,
            token, // 👈 return token directly
            body: {
                success: true,
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { success: false, message: "Internal server error" }
        };
    }
};


// userAuthService.js

export const loginUser = async (req) => {
    const { phone, password } = req.body;

    //Check if all fields are filled or not
    if (!phone || !password) {
        return {
            status: 400,
            body: { success: false, message: "Phone and password required" }
        };
    }

    //Find user by phone
    const user = await findByPhone(phone);
    if (!user) {
        return {
            status: 401,
            body: { success: false, message: "Invalid credentials" }
        };
    }

    //Check if the provided password matches the stored hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return {
            status: 401,
            body: { success: false, message: "Invalid credentials" }
        };
    }

    //Generate JWT Token
    const token = generateToken({ id: user._id });

    return {
        status: 200,
        token, // 👈 return token directly (cleaner)
        body: {
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        }
    };
};