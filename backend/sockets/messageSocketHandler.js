// sockets/messageSocketHandler.js
import {
    handleSendMessage,
    handleTyping,
    handleMessageSeen
} from "../controllers/messageController.js";

const messageSocketHandler = (io, socket) => {
    console.log("Message socket connected:", socket.id);

    socket.on("join-conversation", (conversationId) => {
        socket.join(conversationId.toString());
    });

    socket.on("send-message", (data) => {
        handleSendMessage(io, socket, data);
    });

    socket.on("typing", (data) => handleTyping(socket, data));

    socket.on("message-seen", (data) =>
        handleMessageSeen(io, socket, data)
    );
};

export default messageSocketHandler;
