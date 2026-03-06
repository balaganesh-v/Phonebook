import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/messages`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const getConversations = async () => {
    try {
        const res = await api.get("/conversations");
        return res.data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
};

export const getMessages = async (conversationId) => {
    try {
        const res = await api.get(`/${conversationId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching messages by conversationId:", error);
        throw error;
    }
};

// ✅ Fixed: correct endpoint + correct payload shape
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