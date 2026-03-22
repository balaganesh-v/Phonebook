import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/auth",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

//LOGIN THE SPECIFIC USER
export const loginUser = async ({ phone, password }) => {
    try {
        const res = await api.post("/login", { phone, password });
        return res.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }

};

//REGISTER THE SPECIFIC USER
export const registerUser = async ({ name, email, phone, password }) => {
    try {
        const res = await api.post("/register", { name, email, phone, password });
        return res.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }

};

//LOGOUT THE SPECIFIC USER
export const logoutUser = async () => {
    try {
        const res = await api.post("/logout");
        return res.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }

};

//GET THE CURRENT USER
export const getCurrentUser = async () => {
    try {
        const res = await api.get("/me"); // backend reads token from cookie
        return res.data;
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error;
    }

};

