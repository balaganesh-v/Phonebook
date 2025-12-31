import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser
} from "../services/authService";

import {
    connectSocket,
    disconnectSocket
} from "../socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load current user on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();
                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Connect socket when user logs in, disconnect when user logs out
    useEffect(() => {
        if (user) {
            // User logged in → connect socket
            connectSocket();
        } else {
            // User logged out → disconnect socket
            disconnectSocket();
        }

        // Cleanup: runs when component unmounts
        return () => {
            disconnectSocket();
        };
    }, [user]);


    // Authentication actions
    const login = async (phone, password) => {
        setError(null);
        try {
            const data = await loginUser({ phone, password });
            setUser(data.user); // 🔥 triggers socket connect
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            throw err;
        }
    };

    const register = async (name, email, phone, password) => {
        setError(null);
        try {
            const data = await registerUser({
                name,
                email,
                phone,
                password
            });
            setUser(data.user); // 🔥 triggers socket connect
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null); // 🔥 triggers socket disconnect
        }
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
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
