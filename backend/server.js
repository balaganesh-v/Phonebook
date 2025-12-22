import http from "http";
import cookie from "cookie";
import { Server } from "socket.io";


import app from "./app.js";
import connectDB from "./config/db.js";
import { decodedToken } from "./utils/security.js";
import callSocketHandler from "./sockets/callSocket.js";
import dotenv from "dotenv";


dotenv.config();
await connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true }
});

// 🔐 Socket authentication using HTTP-only cookie
io.use((socket, next) => {
    try {
        const rawCookie = socket.request.headers.cookie;
        if (!rawCookie){
            throw new Error("No cookies found");
        }

        const cookies = cookie.parse(rawCookie);
        const token = cookies.token;

        if (!token){
            throw new Error("Unauthorized");
        }

        socket.user = decodedToken(token);
        next();
    } catch (err) {
        next(err);
    }
});


callSocketHandler(io);

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
