import {
    registerUser,
    callUser,
    answerCall,
    endCall,
    removeUser,
    onlineUsers
} from "../controllers/socketController.js";

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // Register user
        socket.on("register", async (contactId) => {
            try {
                await registerUser(socket, contactId);
            } catch (error) {
                console.error("Register user error:", error.message);
            }
        });

        // Caller initiates call
        socket.on("call-user", async (data) => {
            try {
                await callUser(io, data);
            } catch (error) {
                console.error("Call user error:", error.message);
            }
        });

        // Receiver answers call
        socket.on("answer-call", async ({ callId, answerSDP, callerId }) => {
            try {
                await answerCall({ callId });
                const callerSocketId = onlineUsers.get(String(callerId));
                if (callerSocketId) {
                    io.to(callerSocketId).emit("call-accepted", { answerSDP, callId });
                }
            } catch (error) {
                console.error("Answer call error:", error.message);
            }
        });

        // Exchange ICE candidates
        socket.on("ice-candidate", async ({ targetUserId, candidate }) => {
            try {
                const targetSocketId = onlineUsers.get(String(targetUserId));
                if (targetSocketId) io.to(targetSocketId).emit("ice-candidate", candidate);
            } catch (error) {
                console.error("ICE candidate error:", error.message);
            }
        });

        // End call
        socket.on("end-call", async (data) => {
            try {
                await endCall(data);
                const { callerId, receiverId } = data;
                [callerId, receiverId].forEach(id => {
                    const sId = onlineUsers.get(String(id));
                    if (sId) io.to(sId).emit("call-ended", data);
                });
            } catch (error) {
                console.error("End call error:", error.message);
            }
        });

        // Remove disconnected user
        socket.on("disconnect", async () => {
            try {
                await removeUser(socket.id);
            } catch (error) {
                console.error("Disconnect error:", error.message);
            }
        });
    });
};

export default socketHandler;
