import React from "react";
import { FiPhone, FiUsers, FiMessageSquare, FiStar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const buttons = [
        { label: "Dial", icon: <FiPhone size={22} />, path: "/dashboard/dial" },
        { label: "Contacts", icon: <FiUsers size={22} />, path: "/dashboard/contacts" },
        { label: "Messages", icon: <FiMessageSquare size={22} />, path: "/dashboard/messages" },
        { label: "Favourites", icon: <FiStar size={22} />, path: "/dashboard/favourites" },
    ];

    return (
        <div className="flex justify-around items-center px-4 py-3 w-full bg-slate-900 border-t border-slate-700 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
            {buttons.map((btn) => (
                <div
                    key={btn.label}
                    onClick={() => navigate(btn.path)}
                    className={`flex flex-col items-center gap-1 cursor-pointer px-6 py-2 rounded-xl transition-all
                        ${isActive(btn.path)
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                        }`}
                >
                    {btn.icon}
                    <span className={`text-xs font-semibold ${isActive(btn.path) ? "text-emerald-400" : "text-slate-400"}`}>
                        {btn.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Footer;