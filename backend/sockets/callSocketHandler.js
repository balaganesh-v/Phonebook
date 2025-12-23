// sockets/callSocketHandler.js
import {
    handleCallUser,
    handleAnswerCall,
    handleEndCall,
} from "../controllers/callController.js";

const callSocketHandler = (io, socket) => {

    console.log("Call socket ready:", socket.id);

    // Send back to frontend socket ID and user info
    socket.emit("me", {
        socketId: socket.id,
        user: socket.user
    });


    // Handle call events
    socket.on("call-user", (data) => {
        handleCallUser(io, data);
    });
    
    // Answer call event
    socket.on("answer-call", (data) => {
        handleAnswerCall(io, data);
    });
    
    // End call event
    socket.on("end-call", (data) => {
        handleEndCall(io, data);
    });
    
    
};

export default callSocketHandler;
