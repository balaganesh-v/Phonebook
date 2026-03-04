import express from "express";
import { register, login, profile, logout } from "../controllers/userAuthController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes for User Registration and Login
router.post("/register", register); // name, email, phone, password
router.post("/login", login);       // phone, password

// Protected routes
router.get("/me", authenticate, profile); // Get current user's profile (requires valid JWT)
router.post("/logout", authenticate, logout); // Logout user by clearing cookie (requires valid JWT)

export default router;
