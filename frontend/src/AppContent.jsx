import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useTheme } from "./context/ThemeContext";

export default function AppContent() {
    const { theme } = useTheme(); // consume current theme

    return (
        <div
            className={`${theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
                } min-h-screen flex flex-col`}
        >
            <Navbar />
            <div className="pt-10 flex flex-col items-center justify-center">
                <h1 className={ `${theme === "dark" ? "text-white" : "text-blue-500"} text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-10 `}>
                    Phone Book
                </h1>
                <Home />
            </div>
        </div>
    );
}
