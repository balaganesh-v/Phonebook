import http from "http";
import cookie from "cookie";
import { Server } from "socket.io";
import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import { decodedToken } from "./utils/security.js";
import socketManager from "./sockets/mainSocketManager.js";

dotenv.config();
await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true }
});

// Socket auth middleware
io.use((socket, next) => {
    try {
        const rawCookie = socket.request.headers.cookie;
        if (!rawCookie){
            throw new Error("No Cookies found in the headers");
        }
        const cookies = cookie.parse(rawCookie);
        const token = cookies.token;
        if (!token){
            throw new Error("Unauthorized Access: No token provided");
        }
        socket.user = decodedToken(token);
        next();
    } catch (err) {
        next(err);
    }
});

// SINGLE socket connection
socketManager(io);

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
