// controllers/messageController.js
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";


export const handleSendMessage = async (io, socket, data) => {
    const { conversationId, receiverId, content } = data;

    // 1. Save message
    const message = await Message.create({
        conversation: conversationId,
        sender: socket.userId,
        receiver: receiverId,
        content
    });

    // 2. Update conversation preview
    await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id
    });

    // 3. Emit to conversation room
    io.to(conversationId).emit("receive-message", message);

    // 4. Emit to receiver if online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("message-delivered", {
            messageId: message._id
        });
    }
};

export const handleTyping = (socket, data) => {
    socket.to(data.conversationId).emit("typing", {
        userId: socket.userId
    });
};

export const handleMessageSeen = async (io, socket, data) => {
    await Message.findByIdAndUpdate(data.messageId, {
        status: "seen"
    });

    io.to(data.conversationId).emit("message-seen", {
        messageId: data.messageId,
        seenBy: socket.userId
    });
};


