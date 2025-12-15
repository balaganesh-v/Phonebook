import React from "react";
import { FiPhone, FiUsers, FiMessageSquare, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`flex justify-around items-center p-4 border-t bg-gray b-0 w-full
            ${theme === "light"
                ? "bg-gray-100 text-gray-700"
                : "text-white bg-gray-600 "
            }`}>

            <div
                onClick={() => navigate("/dial")}
                className={`flex flex-col items-center sm:text-sm text-md cursor-pointer text-gray-800 hover:text-blue-500 px-11 py-1
                ${theme === "dark"
                    ? "text-white hover:bg-green-200 hover:rounded-full "
                    : "text-gray-800"
                }`}
            >
                <FiPhone size={22} />
                <span className="font-semibold ">Dial</span>
            </div>

            <div
                onClick={() => navigate("/contacts")}
                className={`flex flex-col items-center sm:text-sm text-md cursor-pointer text-gray-800 hover:text-blue-500 px-8 py-1
                ${theme === "dark"
                    ? "text-white hover:bg-green-200 hover:rounded-full "
                    : "text-gray-800"
                }`}
            >
                <FiUsers size={22} />
                <span className="font-semibold ">Contacts</span>
            </div>

            <div
                onClick={() => navigate("/messages")}
                className={`flex flex-col items-center sm:text-sm md-text-sm text-md cursor-pointer text-gray-800 hover:text-blue-500 px-8 py-1
                ${theme === "dark"
                    ? "text-white hover:bg-green-200 hover:rounded-full "
                    : "text-gray-800"
                }`}
            >
                <FiMessageSquare size={22} />
                <span className="font-semibold ">Messages</span>
            </div>

            <div
                onClick={() => navigate("/favourites")}
                className={`flex flex-col items-center sm:text-sm md:text-sm text-md cursor-pointer text-gray-800 hover:text-blue-500 px-8 py-1
                ${theme === "dark"
                    ? "text-white hover:bg-green-200 hover:rounded-full "
                    : "text-gray-800"
                }`}
            >
                <FiStar size={22} />
                <span className="font-semibold ">Favourites</span>
            </div>

        </div>
    );
};

export default Footer;
