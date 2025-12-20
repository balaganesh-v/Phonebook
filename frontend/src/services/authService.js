import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/auth",
    withCredentials: true, // send HTTP-only cookies
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
