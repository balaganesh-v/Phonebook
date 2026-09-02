import Conversations from "../models/Conversations.js";
import Messages from "../models/Messages.js";

export const getUserConversations = async (userId) => {
    return Conversations.find({
        "participants.userId": userId
    })
        .populate({
            path: "lastMessage",
            populate: { path: "sender", select: "name phone" }
        })
        .sort({ updatedAt: -1 });
};

export const deleteConversationById = async (conversationId) => {
    return Conversations.findByIdAndDelete(conversationId);
};

export const clearConversationById = async (conversationId) => {
    return Messages.deleteMany({ conversation: conversationId });
};

export const getMessagesByConversationId = async (conversationId, limit = 50) => {
    return Messages.find({ conversation: conversationId })
        .populate("sender", "name phone")
        .populate("receiver", "name phone")
        .sort({ createdAt: -1 }) // FIXED
        .limit(limit);
};


//Check if any Conversations exists for this User
export const findConversationByParticipants = async (userIds) => {
    return Conversations.findOne({
        "participants.userId": { $all: userIds }
    });
};

//User Creates the Conversation
export const createConversation = async (data) => {
    return Conversations.create(data);
};


export const createMessage = async (data) => {
    const message = await Messages.create(data);

    await message.populate([
        { path: "sender", select: "name phone" },
        { path: "receiver", select: "name phone" },
        { path: "conversation" }
    ]);

    return message;
};


// Update conversation by ID
export const updateConversationById = async (conversationId, update) => {
    return Conversations.findByIdAndUpdate(conversationId, update, { new: true });
};

// Update message status
export const updateMessageStatus = async (messageId, status) => {
    return Messages.findByIdAndUpdate(messageId, { status }, { new: true });
};
