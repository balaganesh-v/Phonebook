import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const getUserConversations = async (userId) => {                            // Fetch conversations for a logged in user
    return Conversation.find({
        "participants._id": userId
    })
        .populate({
            path: "lastMessage",
            populate: { path: "sender", select: "name phone" }
        })
        .sort({ updatedAt: -1 });
};

export const getMessagesByConversationId = async (conversationId, limit = 50) => { // Fetch messages by conversations ID
    return Message.find({ conversation: conversationId })
        .populate("sender", "name phone")
        .populate("receiver", "name phone")
        .sort({ createdAt: 1 })
        .limit(limit);
};

export const findConversationByParticipants = async (participants) => {
    const ids = participants.map(id => id.toString());

    return Conversation.findOne({
        "participants._id": { $all: ids }
    });
};


export const createConversation = async (participants) => {
    const conversation = new Conversation({ participants });
    return conversation.save();
};




export const createMessage = async (data) => {
    const message = await Message.create(data);

    await message.populate([
        { path: "sender", select: "name phone" },
        { path: "receiver", select: "name phone" },
        { path: "conversation" }
    ]);

    return message;
};


// Update conversation by ID
export const updateConversationById = async (conversationId, update) => {
    return Conversation.findByIdAndUpdate(conversationId, update, { new: true });
};

// Update message status
export const updateMessageStatus = async (messageId, status) => {
    return Message.findByIdAndUpdate(messageId, { status }, { new: true });
};
