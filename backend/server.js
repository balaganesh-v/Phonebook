import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import callSocketHandler from "./sockets/callSocket.js"; // call socket

import { decodedToken } from "./utils/security.js";

dotenv.config();
await connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

// Routes
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.get("/", (req, res) => {
    res.send("Phone Contacts Backend is Running ❤️");
});

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

// Socket authentication
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) throw new Error("Unauthorized");
        socket.user = decodedToken(token);
        next();
    } catch {
        next(new Error("Unauthorized"));
    }
});

callSocketHandler(io);

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});