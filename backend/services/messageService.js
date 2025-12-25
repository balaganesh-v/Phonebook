import {
    findUserConversations,
    findConversationByUsers,
    createConversation,
    updateLastMessage
} from "../repositories/conversationRepository.js";
import {
    findMessagesByConversation,
    createMessage,
    markMessageSeen
} from "../repositories/messageRepository.js";

// Get all conversations for a user
export const getUserConversationsService = (userId) => {
    return findUserConversations(userId);
};

export const getMessagesService = (conversationId) => {
    return findMessagesByConversation(conversationId);
};

export const startConversationService = async (senderId, receiverId) => {
    let conversation = await findConversationByUsers(senderId, receiverId);

    if (!conversation) {
        conversation = await createConversation([senderId, receiverId]);
    }

    return conversation;
};

export const sendMessageService = async ({
    conversation,
    sender,
    receiver,
    content
}) => {
    const message = await createMessage({
        conversation,
        sender,
        receiver,
        content
    });

    await updateLastMessage(conversation, message._id);

    return message;
};

export const markSeenService = (messageId) => {
    return markMessageSeen(messageId);
};
