import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Yuhlogo from "../components/logo/Yuhlogo.jsx";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative w-full px-6 py-4 flex items-center justify-between bg-slate-900 border-b border-slate-700 shadow-sm">

            {/* Logo */}
            <div className="flex items-center gap-3 text-xl font-semibold text-white">
                <Yuhlogo />
            </div>

            {/* Hamburger Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg hover:bg-slate-800 transition-colors"
            >
                <span className={`block h-0.5 w-5 bg-slate-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-5 bg-slate-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-slate-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-full right-4 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">

                    <button
                        onClick={() => {
                            navigate("/dashboard");
                            setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                    >
                        <span className="text-base">🏠</span> Home
                    </button>

                    <button
                        onClick={() => {
                            navigate("/dashboard/contacts");
                            setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                    >
                        <span className="text-base">📒</span> Contacts
                    </button>

                    <button
                        onClick={() => {
                            navigate("/dashboard/messages");
                            setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                    >
                        <span className="text-base">💬</span> Messages
                    </button>

                    <button
                        onClick={() => {
                            navigate("/dashboard/favourites");
                            setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                    >
                        <span className="text-base">⭐</span> Favourites
                    </button>

                    <div className="border-t border-slate-700" />

                    <button
                        onClick={() => { navigate("/dashboard/settings"); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                    >
                        <span className="text-base">⚙️</span> Settings
                    </button>

                    <div className="border-t border-slate-700" />

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                    >
                        <span className="text-base">🚪</span> Logout
                    </button>
                </div>
            )}

            {/* Backdrop to close menu */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Navbar;