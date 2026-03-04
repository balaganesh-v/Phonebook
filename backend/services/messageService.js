import {
    getUserConversations,
    getMessagesByConversationId,
    findConversationByParticipants,
    createConversation,
    createMessage,
    updateConversationById,
    updateMessageStatus
} from "../repositories/messageRepository.js";
import User from "../models/Users.js";

// API Handlers
export const fetchConversations = async (userId) => {
    return getUserConversations(userId);
};

export const fetchMessages = async (conversationId) => {
    return getMessagesByConversationId(conversationId);
};

export const startsConversation = async (senderId,receiverPhone,contactName = null) => {

    // 1️⃣ Sender
    const sender = await User.findById(senderId).select("_id name phone");
    if (!sender) {
        throw new Error("Sender not found");
    }

    // 2️⃣ Prevent self chat
    if (sender.phone === receiverPhone) {
        throw new Error("You cannot start a conversation with yourself");
    }

    // 3️⃣ Receiver via phone
    const receiver = await User.findOne({ phone: receiverPhone })
        .select("_id name phone");

    if (!receiver) {
        throw new Error("Receiver not found with this phone number");
    }

    // 4️⃣ Check existing conversation
    let conversation = await findConversationByParticipants([
        sender._id,
        receiver._id
    ]);

    if (conversation) {
        return conversation;
    }

    // 5️⃣ Participants snapshot
    const participants = [
        {
            _id: sender._id,
            name: sender.name,
            phone: sender.phone
        },
        {
            _id: receiver._id,
            name: contactName || receiver.name,
            phone: receiver.phone
        }
    ];

    // 6️⃣ Contact names map
    const contactNames = {};
    if (contactName) {
        contactNames[receiver.phone] = contactName;
    }

    // 7️⃣ Create conversation
    conversation = await createConversation({
        participants,
        contactNames
    });

    if (!conversation) {
        throw new Error("Failed to create conversation");
    }

    console.log("✅ Conversation created:", {
        id: conversation._id,
        participants: conversation.participants.map(p => ({ _id: p._id, phone: p.phone }))
    });

    return conversation;
};


// Socket Handlers
export const sendMessage = async ({
    conversationId,
    sender,
    receiver,
    content,
    messageType = "text"
}) => {
    const message = await createMessage({
        conversation: conversationId,
        sender,
        receiver,
        content,
        messageType
    });

    await updateConversationById(conversationId, {
        lastMessage: message._id
    });

    return message;
};

export const markMessageSeen = async (messageId) => {
    return updateMessageStatus(messageId, "seen");
};