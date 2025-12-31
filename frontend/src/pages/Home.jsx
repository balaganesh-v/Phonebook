import { Outlet } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Home = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <div className="h-screen flex flex-col">
                    <Navbar />

                    {/* CENTER CONTENT CHANGES HERE */}
                    <main className="flex-1 container mx-auto p-4 bg-gray-100">
                        <Outlet />
                    </main>

                    <Footer />
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default Home;
