import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import Yuhlogo from "../../logo/Yuhlogo.jsx";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const menuItems = [
        { icon: "🏠", label: "Home", path: "/dashboard" },
        { icon: "📒", label: "Contacts", path: "/dashboard/contacts" },
        { icon: "💬", label: "Messages", path: "/dashboard/messages" },
        { icon: "⭐", label: "Favourites", path: "/dashboard/favourites" },
        { icon: "⚙️", label: "Settings", path: "/dashboard/settings" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-amber-500/10 bg-black/95 backdrop-blur-xl">

            <div className="max-w-8xl mx-auto px-5 h-20 flex items-center justify-between">

                <div
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer"
                >
                    <Yuhlogo />
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03]"
                >
                    <span className={`block w-5 h-0.5 bg-amber-300 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />

                    <span className={`block w-5 h-0.5 bg-amber-300 transition-all ${menuOpen ? "opacity-0" : ""}`} />

                    <span className={`block w-5 h-0.5 bg-amber-300 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {menuOpen && (
                <>
                    <div className="absolute top-[88px] right-6 w-64 rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden z-50">

                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => goTo(item.path)}
                                className="w-full flex items-center gap-3 px-5 py-3 text-left text-zinc-300 hover:bg-white/[0.04]"
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}

                        <div className="border-t border-white/5 p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
                            >
                                🚪 Logout
                            </button>
                        </div>

                    </div>

                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                </>
            )}
        </header>
    );
};

export default Navbar;