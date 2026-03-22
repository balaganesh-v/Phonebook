import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/messages",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// READ ALL CONVERSATIONS FOR THE CURRENT USER
export const getConversations = async () => {
    try {
        const res = await api.get("/conversations");
        return res.data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
};

// READ ALL MESSAGES FOR THE CURRENT USER
export const getMessages = async (conversationId) => {
    try {
        const res = await api.get(`/${conversationId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching messages by conversationId:", error);
        throw error;
    }
};

// CREATE CONVERSATION FOR THE CURRENT USER
export const startConversation = async (receiverPhone, contactName) => {
    try {
        console.log("📤 Starting conversation with:", { receiverPhone, contactName });

        const res = await api.post("/user/starts/conversation", {
            receiverPhone,
            contactName,
        });

        console.log("✅ Conversation created:", res.data);
        return res.data;
    } catch (error) {
        console.error("❌ Error starting conversation:", error.response?.data || error.message);
        throw error;
    }
};