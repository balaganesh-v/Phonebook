import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/contacts",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// CREATE CONTACT FOR THE CURRENT USER
export const createContact = async (data) => {
    try {
        const res = await api.post("/", data);
        return res.data.contact;
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

// READ ALL CONTACTS FOR THE CURRENT USER
export const getContacts = async () => {
    try {
        const res = await api.get("/");
        return res.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

// READ ONE CONTACT FOR THE CURRENT USER
export const getContactById = async (id) => {
    try {
        const res = await api.get(`/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching contact by ID:", error);
        throw error;
    }
};

// UPDATE CONTACT FOR THE CURRENT USER
export const updateContactById = async (id, data) => {
    try {
        const res = await api.put(`/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating contact by ID:", error);
        throw error;
    }
};

// DELETE CONTACT FOR THE CURRENT USER
export const deleteContactById = async (id) => {
    try {
        const res = await api.delete(`/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting contact by ID:", error);
        throw error;
    }
};
