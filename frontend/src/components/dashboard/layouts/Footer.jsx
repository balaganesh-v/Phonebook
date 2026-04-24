import React from "react";
import {
    FiPhone,
    FiUsers,
    FiMessageSquare,
    FiStar,
} from "react-icons/fi";

import {
    useNavigate,
    useLocation,
} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path;

    const buttons = [
        {
            label: "Dial",
            icon: <FiPhone size={20} />,
            path: "/dashboard/dial",
        },
        {
            label: "Contacts",
            icon: <FiUsers size={20} />,
            path: "/dashboard/contacts",
        },
        {
            label: "Messages",
            icon: <FiMessageSquare size={20} />,
            path: "/dashboard/messages",
        },
        {
            label: "Favourites",
            icon: <FiStar size={20} />,
            path: "/dashboard/favourites",
        },
    ];

    return (
        <footer className="sticky bottom-0 z-50 w-full border-t border-amber-500/10 bg-black/95 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 gap-4">

                {buttons.map((btn) => {
                    const active = isActive(btn.path);

                    return (
                        <button
                            key={btn.label}
                            onClick={() => navigate(btn.path)}
                            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all ${
                                active
                                    ? "bg-amber-400/10 text-amber-300"
                                    : "text-zinc-500 hover:text-amber-300 hover:bg-white/[0.03]"
                            }`}
                        >
                            {btn.icon}

                            <span className="text-xs">
                                {btn.label}
                            </span>
                        </button>
                    );
                })}

            </div>
        </footer>
    );
};

export default Footer;