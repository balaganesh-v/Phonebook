import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import contactRoutes from "./controllers/contactController.js";
import authRoutes from "./routes/authRoutes.js";

// Node.js built-in module to create a raw HTTP server (required for Socket.IO)
import http from "http";
// Imports Socket.IO server to enable WebSocket connections
import { Server } from "socket.io";
// Imports Socket.IO event handler logic
import socketHandler from "./sockets/index.js";



// Load environment variables from .env file
dotenv.config();

// Connects to MongoDB database
await connectDB();

// Creates an Express application
const app = express();
console.log("🏡Express instance Created Successfully for handling the routes")
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);
app.get("/", (req, res) => {
    res.send("Phone Contacts Backend is Running on Live❤️");
});

/* Socket.IO */

// Create a Node.js HTTP server and attach the Express app.
// Needed because Socket.IO requires a raw HTTP server to manage
// long-lived connections and WebSocket upgrades.
const server = http.createServer(app);

// Create and attach a Socket.IO server to the same HTTP server.
// This allows REST APIs and real-time communication to run
// on the same port and share the same server.
const io = new Server(server, {
    cors: { origin: "*" } // Allows frontend clients to connect (development use)
});

// Confirms that the Socket.IO server is ready.
console.log("Socket.IO server initialized");

// Register all socket events (connect, message, disconnect).
// Keeps socket logic separate from server setup.
socketHandler(io);

//start to run the backend server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    // Starts the HTTP + Socket.IO server on the specified port
    console.log(`🌍 Server running on http://localhost:${PORT}`)
);
