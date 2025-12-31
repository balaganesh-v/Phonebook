import {
    fetchConversations,
    fetchMessages,
    startsConversation,
    sendMessage,
    markMessageSeen
} from "../services/messageService.js";

// API Handlers
export const getConversations = async (req, res) => {
    try {
        const conversations = await fetchConversations(req.user);
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await fetchMessages(conversationId);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const userStartsConversation = async (req, res) => {
    try {
        const senderId = req.user._id || req.user.id
        const { receiverId } = req.body;
        console.log("Sender ID:", senderId)
        console.log("Receiver ID:", receiverId)
        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }
        
        
        const conversation = await startsConversation(
            senderId,   // sender (logged-in user)
            receiverId      // receiver
        );

        res.json(conversation);
    } catch (err) {
        console.error("Start conversation error:", err);
        res.status(500).json({ message: err.message });
    }
};


// Socket Handlers
export const handleSendMessage = async (io, socket, data) => {
    try {
        const senderId = socket.user._id;
        const { conversationId, receiverId, content, messageType } = data;

        if (!conversationId) {
            throw new Error("ConversationId required");
        }

        const message = await sendMessage({
            conversationId,
            sender: senderId,
            receiver: receiverId,
            content,
            messageType
        });

        io.to(conversationId.toString()).emit("new-message", message);
    } catch (err) {
        console.error("Socket send error:", err);
    }
};

export const handleTyping = (socket, data) => {
    const { conversationId, isTyping } = data;
    socket.to(conversationId).emit("typing", { userId: socket.user._id, isTyping });
};

export const handleMessageSeen = async (io, socket, data) => {
    const { messageId, conversationId } = data;
    const message = await markMessageSeen(messageId);
    io.to(conversationId).emit("message-seen", message);
};
