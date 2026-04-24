import { useState } from "react";
import { useNavigate } from "react-router-dom";

import yuh from "../../../assets/phone-chat.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = ["Home", "Features", "Chat", "Contact"];

    return (
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-amber-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 cursor-pointer select-none"
                >
                    <div className="relative">
                        <img
                            src={yuh}
                            alt="Logo"
                            className="w-11 h-11 rounded-xl object-cover border border-amber-400/30"
                        />

                        <div className="absolute inset-0 rounded-xl shadow-[0_0_18px_rgba(251,191,36,0.20)]"></div>
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-white text-2xl tracking-wide [font-family:'Pacifico',cursive]">
                            PhoneBook
                        </h1>

                        <p className="text-[11px] uppercase tracking-[3px] text-amber-300/80 font-medium [font-family:'Poppins',sans-serif]">
                            Stay Connected
                        </p>
                    </div>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                    {navLinks.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="relative text-slate-300 hover:text-amber-300 text-base tracking-wide transition-all duration-300 group [font-family:'Dancing_Script',cursive]"
                            >
                                {item}

                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/30 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 [font-family:'Poppins',sans-serif]"
                    >
                        Log In
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:scale-105 transition-all duration-300 shadow-[0_0_22px_rgba(251,191,36,0.28)] [font-family:'Poppins',sans-serif]"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-amber-300"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 pb-5">
                    <div className="rounded-2xl border border-amber-500/10 bg-zinc-950/95 backdrop-blur-xl p-5 shadow-2xl">
                        <ul className="flex flex-col gap-4 list-none m-0 p-0">
                            {navLinks.map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-slate-300 hover:text-amber-300 text-xl transition-colors [font-family:'Dancing_Script',cursive]"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 font-medium [font-family:'Poppins',sans-serif]"
                            >
                                Log In
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="w-full py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 [font-family:'Poppins',sans-serif]"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;