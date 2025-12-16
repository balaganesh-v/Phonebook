import {
    registerUser,
    callUser,
    answerCall,
    endCall,
    removeUser
} from "../controllers/socketController.js";

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("register", (contactId) => {
            registerUser(socket, contactId);
        });

        socket.on("call-user", async (data) => {
            await callUser(io, data);
        });

        socket.on("answer-call", async (data) => {
            await answerCall(data);
        });

        socket.on("end-call", async (data) => {
            await endCall(data);
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("Socket disconnected:", socket.id);
        });
    });
};

export default socketHandler;
