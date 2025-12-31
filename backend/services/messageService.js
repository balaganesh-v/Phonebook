import {
    getUserConversations,
    getMessagesByConversationId,
    findConversationByParticipants,
    createConversation,
    createMessage,
    updateConversationById,
    updateMessageStatus
} from "../repositories/messageRepository.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";


// API Handlers
export const fetchConversations = async (userId) => {
    return getUserConversations(userId);
};

export const fetchMessages = async (conversationId) => {
    return getMessagesByConversationId(conversationId);
};

export const startsConversation = async (senderId, receiverContactId) => {

    // 1️⃣ Check existing conversation
    let conversation = await findConversationByParticipants([
        senderId,
        receiverContactId
    ]);
    if (conversation) return conversation;

    // 2️⃣ Get sender from USERS
    const sender = await User.findById(senderId).select("_id name phone");
    if (!sender) {
        throw new Error("Sender not found");
    }

    // 3️⃣ Get receiver from CONTACTS
    const receiver = await Contact.findById(receiverContactId).select("_id name phone");
    if (!receiver) {
        throw new Error("Receiver contact not found");
    }

    // 4️⃣ Build participant snapshots
    const participants = [
        {
            _id: sender._id,
            name: sender.name,
            phone: sender.phone
        },
        {
            _id: receiver._id,
            name: receiver.name,
            phone: receiver.phone
        }
    ];

    // 5️⃣ Create conversation
    conversation = await createConversation(participants);
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