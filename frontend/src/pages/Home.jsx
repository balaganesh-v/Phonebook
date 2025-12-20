import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div>
            <div>
                <AuthProvider>
                    <ThemeProvider>
                        <Navbar />
                    </ThemeProvider>
                </AuthProvider>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Welcome to dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        </div>

    );
};

export default Home;
