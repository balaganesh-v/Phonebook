import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/messages",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const getConversations = async () => {
    try{
        const res = await api.get("/conversations");
        return res.data;
    }catch(error){
        console.error("Error fetching conversations:", error);
        throw error;
    }
    
};

export const getMessages = async (conversationId) => {
    try{
        const res = await api.get(`/${conversationId}`);
        return res.data;
    }catch(error){
        console.error("Error fetching messages by conversationId:", error);
        throw error;
    }
    
};

export const startConversation = async (receiverId) => {
    try{
        const res = await api.post("/user/starts/conversations", {receiverId});
        return res.data;
    }catch(error){
        console.error("Error starting conversation:", error);
        throw error;
    }
};
