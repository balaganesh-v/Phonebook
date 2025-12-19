import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes)

app.get("/", (req, res) => {
    res.send("Phone Contacts Backend is running ❤️");
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 400).json({ message: err.message || "Something went wrong" });
});

export default app;
