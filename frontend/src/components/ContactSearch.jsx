import { useContacts } from "../context/ContactContext";
import { useTheme } from "../context/ThemeContext";

const ContactSearch = () => {
    const { searchQuery, setSearchQuery } = useContacts();
    const { theme } = useTheme();

    return (
        <div
            className={`w-full max-w-2xl mx-auto mb-4  py-1 rounded-lg border transition-shadow ${theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white hover:shadow-md"
                    : "bg-white border-gray-400 text-gray-900 hover:shadow-md"
                }`}
        >
            <input
            type="text"
            placeholder="Search by contact name..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full p-2 ml-2 rounded border-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent"
            />
        </div>
    );
};

export default ContactSearch;
