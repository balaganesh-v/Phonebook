import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/contacts",
    withCredentials: true, // backend handles auth via cookies
    headers: { "Content-Type": "application/json" },
});

// CREATE
export const createContact = async (data) => {
    try{
        const res = await api.post("/", data);
        return res.data;
    }
    catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

// READ ALL
export const getContacts = async () => {
    try{
        const res = await api.get("/");
        return res.data;
    }catch(error){
        console.error("Error fetching contacts:", error);
        throw error;
    }

};

// READ ONE
export const getContactById = async (id) => {
    try{
        const res = await api.get(`/${id}`);
        return res.data;
    }catch(error){
        console.error("Error fetching contact by ID :", error);
        throw error;
    }
};

// UPDATE
export const updateContactById = async (id, data) => {
    try{
        const res = await api.put(`/${id}`, data);
        return res.data;
    }catch(error){
        console.error("Error updating contact by ID :", error);
        throw error;
    }
};

// DELETE
export const deleteContactById = async (id) => {
    try{
        const res = await api.delete(`/${id}`);
        return res.data;
    }catch(error){
        console.error("Error deleting contact by ID :", error);
        throw error;
    }
};
