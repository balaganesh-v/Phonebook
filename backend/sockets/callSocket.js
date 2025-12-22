import {
    registerUser,
    handleCallUser,
    handleAnswerCall,
    handleEndCall,
    removeUser
} from "../controllers/callController.js";

const callSocketHandler = (io) => {
    io.on("connection", (socket) => {

        console.log("Socket connected:", {
            socketId: socket.id,
            user: socket.user
        });

        // ✅ Send self info to frontend
        socket.emit("me", {
            socketId: socket.id,
            user: socket.user
        });

        // Register logged-in user
        socket.on("register", (userId) => {
            registerUser(socket, userId, io);
        });

        socket.on("call-user", (data) => {
            handleCallUser(io, data);
        });

        socket.on("answer-call", (data) => {
            handleAnswerCall(io, data);
        });

        socket.on("end-call", (data) => {
            handleEndCall(io, data);
        });

        socket.on("disconnect", () => {
            removeUser(socket.id, io);
        });
    });
};

export default callSocketHandler;
