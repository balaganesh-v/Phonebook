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

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://phonebook-applications.onrender.com", "http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST","PUT","DELETE"]
    }
});

// Socket auth middleware
io.use(async (socket, next) => {
    try {
        const rawCookie = socket.request.headers.cookie;
        if (!rawCookie) {
            throw new Error("No Cookies found in the headers");
        }
        const cookies = cookie.parse(rawCookie);
        const token = cookies.token;
        if (!token) {
            throw new Error("Unauthorized Access: No token provided");
        }

        const decoded = verifyToken(token);
        const user = await Users.findById(decoded.id).select("-password");
        if (!user) {
            throw new Error("Unauthorized: User not found");
        }

        socket.user = user;
        next();
    } catch (err) {
        next(err);
    }
});

socketManager(io);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});