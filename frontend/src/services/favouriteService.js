import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/favourites",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

//Contact Favourites
export const getFavouriteContactIds = async () => {
    try {
        const res = await api.get("/contacts");
        return res.data; // string[]
    } catch (error) {
        console.error("Error fetching favourite contact IDs:", error);
        throw error;
    }

};

export const addContactFavourite = async (contactId) => {
    try {
        const res = await api.post(`/contacts/${contactId}`);
        return res.data;
    } catch (error) {
        console.error("Error adding contact as favourite:", error);
        throw error;
    }
};


export const removeContactFavourite = async (contactId) => {
    try {
        const res = await api.delete(`/contacts/${contactId}`);
        return res.data;
    } catch (error) {
        console.error("Error removing contact from favourites:", error);
        throw error;
    }
};

//Conversation Favourites
export const getFavouriteConversationIds = async () => {
    try {
        const res = await api.get("/conversations");
        return res.data; // string[]
    } catch (error) {

    }

};

export const addConversationFavourite = async (conversationId) => {
    try {
        const res = await api.post(`/conversations/${conversationId}`);
        return res.data;
    } catch (error) {
        console.error("Error adding conversation as favourite:", error);
        throw error;
    }

};

export const removeConversationFavourite = async (conversationId) => {
    try {
        const res = await api.delete(`/conversations/${conversationId}`);
        return res.data;
    } catch (error) {
        console.error("Error removing conversation from favourites:", error);
        throw error;
    }
};