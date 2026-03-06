import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    console.warn("⚠️ VITE_API_URL is not defined. Check your .env file.");
}

const api = axios.create({
    baseURL: `${BASE_URL}/auth`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const loginUser = async ({ phone, password }) => {
    const res = await api.post("/login", { phone, password });
    return res.data;
};

export const registerUser = async ({ name, email, phone, password }) => {
    const res = await api.post("/register", { name, email, phone, password });
    return res.data;
};

export const logoutUser = async () => {
    const res = await api.post("/logout");
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await api.get("/me"); // backend reads token from cookie
    return res.data;
};
