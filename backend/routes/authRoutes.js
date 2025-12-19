import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // name, email, phone, password
router.post("/login", login);       // phone, password

export default router;
