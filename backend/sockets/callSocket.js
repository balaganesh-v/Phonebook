import {
    registerUser,
    handleCallUser,
    handleAnswerCall,
    handleEndCall,
    removeUser
} from "../controllers/callController.js";

const callSocketHandler = (io) => {
    io.on("connection", (socket) => {

        // Register logged-in user
        socket.on("register", (userId) => {
            registerUser(socket, userId);
        });

        // Call a user
        socket.on("call-user", (data) => {
            handleCallUser(io, data);
        });

        // Answer call
        socket.on("answer-call", (data) => {
            handleAnswerCall(io, data);
        });

        // End call
        socket.on("end-call", (data) => {
            handleEndCall(io, data);
        });

        // Disconnect
        socket.on("disconnect", () => {
            removeUser(socket.id);
        });
    });
};

export default callSocketHandler;
