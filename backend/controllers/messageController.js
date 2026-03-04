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
        const conversations = await fetchConversations(req.user._id || req.user.id);
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
        console.log("📨 req.user:", req.user);
        
        const senderId = req.user._id || req.user.id;
        const { receiverPhone, contactName } = req.body;

        console.log("📨 senderId:", senderId, "receiverPhone:", receiverPhone, "contactName:", contactName);

        if (!senderId) {
            return res.status(400).json({
                message: "User ID is missing from authentication"
            });
        }

        if (!receiverPhone) {
            return res.status(400).json({
                message: "Receiver phone number is required"
            });
        }

        const conversation = await startsConversation(
            senderId,
            receiverPhone,
            contactName
        );

        console.log("✅ Conversation created successfully:", conversation._id);
        return res.status(200).json(conversation);

    } catch (error) {
        console.error("❌ Conversation start error:", error.message);
        console.error("Stack trace:", error.stack);
        return res.status(500).json({
            message: error.message
        });
    }
};



export const handleSendMessage = async (io, socket, data) => {
    try {
        if (!socket.user) {
            throw new Error("Unauthorized socket");
        }

        const { conversationId, receiverId, content, messageType } = data;

        if (!conversationId || !content) {
            throw new Error("conversationId and content are required");
        }

        const message = await sendMessage({
            conversationId,
            sender: socket.user._id,
            receiver: receiverId,
            content,
            messageType
        });

        io.to(conversationId.toString()).emit("new-message", message);
    } catch (err) {
        console.error("Socket send error:", err.message);
    }
};

export const handleTyping = (socket, data) => {
    if (!socket.user) return;

    const { conversationId, isTyping } = data;
    if (!conversationId) return;

    socket.to(conversationId.toString()).emit("typing", {
        userId: socket.user._id,
        isTyping
    });
};

export const handleMessageSeen = async (io, socket, data) => {
    try {
        const { messageId, conversationId } = data;
        if (!messageId || !conversationId) return;

        const message = await markMessageSeen(messageId);
        io.to(conversationId.toString()).emit("message-seen", message);
    } catch (err) {
        console.error("Message seen error:", err.message);
    }
};