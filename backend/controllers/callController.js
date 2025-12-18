import * as callService from "../services/callService.js";

// Track online users
export const onlineUsers = new Map();

// Register connected user
export const registerUser = (socket, userId) => {
    if (!userId) throw new Error("User ID required");
    onlineUsers.set(userId.toString(), socket.id);
};

// Start a call
export const handleCallUser = async (io, data) => {
    const { callerId, receiverId, callType, offerSDP } = data;

    const call = await callService.startCall({ callerId, receiverId, callType });

    const receiverSocket = onlineUsers.get(receiverId.toString());
    if (receiverSocket) {
        io.to(receiverSocket).emit("incoming-call", {
            callId: call._id,
            callerId,
            callType,
            offerSDP
        });
    }
};

// Answer call
export const handleAnswerCall = async (io, data) => {
    const { callId, callerId, answerSDP } = data;

    await callService.answerCall(callId);

    const callerSocket = onlineUsers.get(callerId.toString());
    if (callerSocket) {
        io.to(callerSocket).emit("call-accepted", { callId, answerSDP });
    }
};

// End call
export const handleEndCall = async (io, data) => {
    const { callId, callerId, receiverId } = data;

    await callService.endCall(callId);

    [callerId, receiverId].forEach(id => {
        const socketId = onlineUsers.get(id.toString());
        if (socketId) {
            io.to(socketId).emit("call-ended", { callId });
        }
    });
};

// Remove disconnected user
export const removeUser = (socketId) => {
    for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socketId) {
            onlineUsers.delete(userId);
            break;
        }
    }
};
