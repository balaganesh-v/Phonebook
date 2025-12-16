import { useTheme } from "../../context/ThemeContext";

const ContactAvatar = ({ name }) => {
    const { theme } = useTheme();
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <div
            className={`flex items-center justify-center w-12 h-12 rounded-full
                font-bold text-lg flex-shrink-0
                ${theme === "dark"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
        >
            {initial}
        </div>
    );
};

export default ContactAvatar;
