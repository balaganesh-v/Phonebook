import express from "express";
import { register, login, profile, logout } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register); // name, email, phone, password
router.post("/login", login);       // phone, password

// Protected routes
router.get("/me", authenticate, profile);
router.post("/logout", authenticate, logout);

export default router;
