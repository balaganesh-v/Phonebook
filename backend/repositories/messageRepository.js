import Message from "../models/Message.js";

export const findMessagesByConversation = (conversationId) => {
    return Message.find({ conversation: conversationId })
        .sort({ createdAt: 1 });
};

export const createMessage = (data) => {
    return Message.create(data);
};

export const markMessageSeen = (messageId) => {
    return Message.findByIdAndUpdate(
        messageId,
        { status: "seen" },
        { new: true }
    );
};
