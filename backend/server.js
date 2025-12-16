import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Node.js built-in module to create a raw HTTP server (required for Socket.IO)
import http from "http";

// Imports Socket.IO server to enable WebSocket connections
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import contactRoutes from "./controllers/contactController.js";
// Imports Socket.IO event handler logic
import socketHandler from "./sockets/index.js";


dotenv.config();

const app = express();

// Creates an HTTP server using Express (needed for Socket.IO)
const server = http.createServer(app);
console.log("🏡 HTTP Server Created Successfully for handling the routes")

/* DB */
connectDB();

/* Middleware Cross Origins */
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

/* REST */
app.use("/contacts", contactRoutes);

/* HOME */
app.get("/", (req, res) => {
    res.send("Phone Contacts Backend is Running on Live❤️");
});

/* Socket.IO */
// Creates a Socket.IO server and attaches it to the HTTP server
const io = new Server(server, {
    cors: { origin: "*" }
});
console.log("📞 Socket.IO server created successfully for handling the live calls ")
// Passes the Socket.IO instance to handle socket events separately
socketHandler(io);

/* Start */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    // Starts the HTTP + Socket.IO server on the specified port
    console.log(`🌍 Server running on http://localhost:${PORT}`)
);
