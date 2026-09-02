import http from "http";
import cookie from "cookie";
import { Server } from "socket.io";

import { verifyToken } from "./utils/security.js";
import Users from "./models/Users.js";
import socketManager from "./sockets/mainSocketManager.js";

import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
await connectDB();

// Using app instance to creates the Server for Express and Socket.IO
const server = http.createServer(app);

// Socket.IO setup with CORS configuration
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true }
});

// Socket auth middleware
io.use(async (socket, next) => {
    try {
        //Get the raw cookies from the headers
        const rawCookie = socket.request.headers.cookie;
        if (!rawCookie) {
            throw new Error("No Cookies found in the headers");
        }

        //Parse the raw cookies
        const cookies = cookie.parse(rawCookie);

        //Get the token from the cookies
        const token = cookies.token;
        if (!token) {
            throw new Error("Unauthorized Access: No token provided");
        }

        // Verify token and attach full user document to the socket
        const decoded = verifyToken(token);

        // User verification
        const user = await Users.findById(decoded.id).select("-password");
        if (!user) {
            throw new Error("Unauthorized: User not found");
        }

        // Attach user to socket
        socket.user = user;

        next();
    } catch (err) {
        next(err);
    }
});

// SINGLE socket connection
socketManager(io);

server.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
