import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper — update both user and isAuthenticated together
    const setAuthUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(!!userData);
    };

    // Load current user on mount (checks HttpOnly cookie via backend)
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();
                setAuthUser(data?.data ?? null); // single call updates both states
            } catch {
                setAuthUser(null); // clears both on failure
            } finally {
                setLoading(false); // always stop loading
            }
        };
        loadUser();
    }, []); // runs only once on mount

    // Login action
    const login = async (phone, password) => {
        setError(null);
        try {
            const data = await loginUser({ phone, password });
            setAuthUser(data?.user ?? null); // updates both user + isAuthenticated
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw err;
        }
    };

    // Register action
    const register = async (name, email, phone, password) => {
        setError(null);
        try {
            const data = await registerUser({ name, email, phone, password });
            setAuthUser(data.user); // updates both user + isAuthenticated
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            throw err;
        }
    };

    // Logout action
    const logout = async () => {
        setError(null);
        try {
            await logoutUser();
        } catch (err) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setAuthUser(null); // clears both user + isAuthenticated
        }
    };

    // Memoized context value — prevents unnecessary re-renders
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};