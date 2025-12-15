import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={`w-full px-6 py-4 flex justify-between shadow-md
                ${theme === "light"
                    ? "bg-gray-300 text-gray-700 hover:text-gray-900 hover:"
                    : "bg-gray-600 text-white"
                }`}
        >
            <div className="flex items-center gap-3 text-xl font-semibold">
                <span>Yuhnie❤️!!</span>
            </div>
            <button onClick={toggleTheme}
                className={`flex p-1 text-xl rounded-full text-center align-center justify-center ${theme === "light" ? "bg-gray-700" : "bg-gray-100" }`}
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>
        </div>
    );
};

export default Navbar;
