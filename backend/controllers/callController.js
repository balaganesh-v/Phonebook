const onlineUsers = new Map(); // userId -> socketId

export const registerUser = (socket, userId, io) => {
    onlineUsers.set(userId, socket.id);
    socket.userId = userId;

    // ✅ Notify all clients
    io.emit("online-users", Array.from(onlineUsers.keys()));
};

export const removeUser = (socketId, io) => {
    for (const [userId, id] of onlineUsers.entries()) {
        if (id === socketId) {
            onlineUsers.delete(userId);
            break;
        }
    }

    io.emit("online-users", Array.from(onlineUsers.keys()));
};

export const handleCallUser = (io, data) => {
    const receiverSocketId = onlineUsers.get(data.to);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("incoming-call", data);
    }
};

export const handleAnswerCall = (io, data) => {
    const callerSocketId = onlineUsers.get(data.to);
    if (callerSocketId) {
        io.to(callerSocketId).emit("call-answered", data);
    }
};

export const handleEndCall = (io, data) => {
    const socketId = onlineUsers.get(data.to);
    if (socketId) {
        io.to(socketId).emit("call-ended");
    }
};
