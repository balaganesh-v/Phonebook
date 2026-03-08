import React, { createContext, useEffect, useState, useMemo } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setAuthUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(!!userData);
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();
                setAuthUser(data?.data ?? null);
            } catch {
                setAuthUser(null);
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
            setAuthUser(data?.user ?? null);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw err;
        }
    };

    const register = async (name, email, phone, password) => {
        setError(null);
        try {
            const data = await registerUser({ name, email, phone, password });
            setAuthUser(data.user);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            throw err;
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await logoutUser();
        } catch (err) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setAuthUser(null);
        }
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
    }), [user, isAuthenticated, loading, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};