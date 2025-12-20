import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { decodedToken } from "./utils/security.js";
import callSocketHandler from "./sockets/callSocket.js";

dotenv.config();
await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true }
});

// Socket.IO authentication
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) throw new Error("Unauthorized");
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
