import {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUsers
} from "./onlineUsers.js";

import messageSocketHandler from "./messageSocketHandler.js";

const socketManager = (io) => {
    io.on("connection", (socket) => {

        //Get the user id from the socket
        const userId = (socket.user && (socket.user._id || socket.user.id))?.toString();
        //If no user is found disconnect the socket
        if (!userId) {
            console.warn("Socket connected without a valid user, disconnecting:", socket.id);
            socket.disconnect(true);
            return;
        }

        // Register user ONCE from verified token + DB lookup
        addOnlineUser(userId, socket.id);

        // Updated online users list to all clients
        socket.on("register", (id) => {
            if (id) {
                addOnlineUser(id.toString(), socket.id);
                io.emit("online-users", getOnlineUsers());
            }
        });

        io.emit("online-users", getOnlineUsers());

        console.log("Socket connected:", {
            socketId: socket.id,
            userId
        });

        messageSocketHandler(io, socket);

        socket.on("disconnect", () => {
            const removedUser = removeOnlineUser(socket.id);
            if (removedUser) {
                io.emit("online-users", getOnlineUsers());
            }
            console.log("Socket disconnected:", {
                socketId: socket.id,
                userId
            });
        });
    });
};

export default socketManager;


// io - Whole server (all clients)
// socket - Single client
// socket.emit - Send to single client
// socket.broadcast.emit - Send to all clients except the sender
// io.emit - Send to all clients



// Simple Analogy

// Think of it like a **phone call**:

// Client  →  dials the number (io("http://localhost:5001"))
// Server  →  phone rings     (io.on("connection"))