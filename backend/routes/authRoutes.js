import express from "express";
import { register, login , getCurrentUser } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Protect all routes
router.use(authenticate);

router.post("/register", register); // name, email, phone, password
router.post("/login", login);       // phone, password
router.get("/me", getCurrentUser);

export default router;
