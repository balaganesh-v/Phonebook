import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/userAuthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";

// Create Express App application instance
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // Allow frontend (Vite app)
        credentials: true,               // Allow cookies/auth headers
    })
);


app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/messages", messageRoutes);
app.use("/favourites", favouriteRoutes);

app.get("/", (req, res) => {
    res.send("Yuhnie!! PhoneBook Backend is running ❤️");
});

// Middleware to handle errors across the app
app.use((err, req, res, next) => {
    // Log error message in console
    console.error("Error:", err.message);
    // If response is not already sent
    if (!res.headersSent) {
        // Send error response with status code
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong"
        });
    } else {
        // If response already sent, pass error to default handler
        next(err);
    }
});

export default app;