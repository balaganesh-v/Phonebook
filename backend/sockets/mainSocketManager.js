import {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUsers
} from "./onlineUsers.js";

import callSocketHandler from "./callSocketHandler.js";
import messageSocketHandler from "./messageSocketHandler.js";

const socketManager = (io) => {
    io.on("connection", (socket) => {

        const userId = socket.user.id; // or socket.user.id

        // ✅ Register user ONCE from decoded token
        addOnlineUser(userId, socket.id);

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
