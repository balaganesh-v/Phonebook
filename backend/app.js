import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/userAuthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);

// Routes
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/messages", messageRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("Phone Contacts Backend is running ❤️");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);

    if (!res.headersSent) {
        res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
    } else {
        next(err);
    }
});

export default app;