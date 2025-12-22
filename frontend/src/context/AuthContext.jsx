import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/authService";
import { socket } from "../socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data?.user || null);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // 🔌 SOCKET CONNECTION CONTROL
    useEffect(() => {
        if (user) {
            socket.connect();

            socket.on("connect", () => {
                console.log("Socket connected:", socket.user);
            });

            socket.on("connect_error", (err) => {
                console.error("Socket error:", err.message);
            });
        }

        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, [user]);

    const login = async (phone, password) => {
        setError(null);
        try {
            const data = await loginUser({ phone, password });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            throw err;
        }
    };

    const register = async (name, email, phone, password) => {
        setError(null);
        try {
            const data = await registerUser({ name, email, phone, password });
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        }
    };

    const logout = async () => {
        await logoutUser();
        socket.disconnect();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
