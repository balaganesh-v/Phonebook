import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser(); // backend reads cookie
                setUser(data?.user || null);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

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
