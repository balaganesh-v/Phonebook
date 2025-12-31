import {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUsers
} from "./onlineUsers.js";

import callSocketHandler from "./callSocketHandler.js";
import messageSocketHandler from "./messageSocketHandler.js";

const socketManager = (io) => {
    io.on("connection", (socket) => {

        // Normalize user id (Mongoose docs have _id and id alias)
        const userId = (socket.user && (socket.user._id || socket.user.id))?.toString();
        if (!userId) {
            console.warn("Socket connected without a valid user, disconnecting:", socket.id);
            socket.disconnect(true);
            return;
        }

        // Register user ONCE from verified token + DB lookup
        addOnlineUser(userId, socket.id);

        // Backwards compatibility: handle client 'register' emits if any
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

        callSocketHandler(io, socket);
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
