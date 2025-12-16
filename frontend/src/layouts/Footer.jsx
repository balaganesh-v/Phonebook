import React from "react";
import { FiPhone, FiUsers, FiMessageSquare, FiStar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation(); // Track current route

    // Optional: track active item by route
    const isActive = (path) => {
        return location.pathname === path;
    }

    const buttons = [
        { label: "Dial", icon: <FiPhone size={22} />, path: "/dial" },
        { label: "Contacts", icon: <FiUsers size={22} />, path: "/contacts" },
        { label: "Messages", icon: <FiMessageSquare size={22} />, path: "/messages" },
        { label: "Favourites", icon: <FiStar size={22} />, path: "/favourites" },
    ];

    return (
        <div
            className={`flex justify-around items-center p-4 w-full
                ${theme === "light"
                    ? "bg-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.15)]"
                    : "bg-gray-600"
                }
            `}
        >
            
            {buttons.map((btn) => (
                <div
                    key={btn.label}
                    onClick={() => navigate(btn.path)}
                    className={`flex flex-col items-center sm:text-sm text-md cursor-pointer
                        px-8 py-2 rounded-full transition-all duration-200 shadow-xl
                        ${isActive(btn.path)
                            ? "bg-green-300 text-black"
                            : theme === "dark"
                                ? "text-gray-100 bg-gray-600  hover:bg-green-200 hover:text-black"
                                : "text-gray-800 bg-gray-100  hover:bg-green-200"
                        }
                        
                    `}
                >
                    {btn.icon}
                    <span className="font-semibold">{btn.label}</span>
                </div>

            ))}
        </div>
    );
};

export default Footer;
