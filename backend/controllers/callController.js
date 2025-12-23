
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
