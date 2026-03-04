import {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUsers
} from "./onlineUsers.js";

import messageSocketHandler from "./messageSocketHandler.js";

const socketManager = (io) => {
    io.on("connection", (socket) => {

        const userId = (socket.user && (socket.user._id || socket.user.id))?.toString();
        if (!userId) {
            console.warn("Socket connected without a valid user, disconnecting:", socket.id);
            socket.disconnect(true);
            return;
        }

        // Register user ONCE from verified token + DB lookup
        addOnlineUser(userId, socket.id);

        // Emit updated online users list to all clients
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

            console.log("Socket disconnected:", socket.id);
        });
    });
};

export default socketManager;

