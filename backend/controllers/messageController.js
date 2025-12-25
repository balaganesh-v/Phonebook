import {
    getUserConversationsService,
    getMessagesService,
    startConversationService,
    sendMessageService,
    markSeenService
} from "../services/messageService.js";

import Conversation from "../models/Conversation.js";

/* REST APIs */

export const getConversations = async (req, res) => {
    const conversations = await getUserConversationsService(req.user.id);
    res.json(conversations);
};

export const getMessages = async (req, res) => {
    const messages = await getMessagesService(req.params.conversationId);
    res.json(messages);
};

export const startConversation = async (req, res) => {
    const conversation = await startConversationService(
        req.user.id,
        req.body.receiverId
    );
    res.json(conversation);
};

/* SOCKET HANDLERS */

export const handleSendMessage = async (io, socket, data) => {
    const senderId = socket.user.id;
    const { conversationId, content } = data;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return;

    const receiverId = conversation.participants.find(
        id => id.toString() !== senderId
    );

    const message = await sendMessageService({
        conversation: conversationId,
        sender: senderId,
        receiver: receiverId,
        content
    });

    io.to(conversationId).emit("new-message", message);
};

export const handleTyping = (socket, data) => {
    socket.to(data.conversationId).emit("typing", {
        userId: socket.user.id
    });
};

export const handleMessageSeen = async (io, socket, data) => {
    const message = await markSeenService(data.messageId);

    io.to(data.conversationId).emit("message-seen", {
        messageId: message._id,
        userId: socket.user.id
    });
};
