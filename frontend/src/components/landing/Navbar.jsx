import { useState } from "react";
import { useNavigate } from "react-router-dom";

import yuh from "../../assets/yuhChat.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = ["Home", "Features", "Chat", "Contact"];

    return (
        <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={yuh} className="w-10 h-10 rounded-md" />
                    <span className="text-xl font-bold text-white tracking-tight">yuhnie !!</span>
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                    {navLinks.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="text-slate-300 hover:text-emerald-400 font-medium text-sm transition-colors"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-slate-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors bg-transparent border-none cursor-pointer"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
                    >
                        Get Started Free
                    </button>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-2xl text-slate-300 bg-transparent border-none cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col gap-4 px-6 py-4 bg-slate-800 border-t border-slate-700 list-none m-0">
                    {navLinks.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="text-slate-300 hover:text-emerald-400 font-medium text-base transition-colors"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                    <li className="flex flex-col gap-2 pt-2 border-t border-slate-700">
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full border border-slate-600 text-slate-300 font-semibold px-5 py-2.5 rounded-lg text-sm bg-transparent cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-5 py-2.5 rounded-lg transition-colors"
                        >
                            Get Started Free
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;