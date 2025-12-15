import { useState, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { useContacts } from "../context/ContactContext";
import { useTheme } from "../context/ThemeContext"; // adjust if needed

const AddContactButton = () => {
    const [showForm, setShowForm] = useState(false);
    const { editingContact } = useContacts();
    const { theme } = useTheme();

    // Automatically open the form when editing a contact
    useEffect(() => {
        if (editingContact) {
            setShowForm(true);
        }
    }, [editingContact]);

    return (
        <div className="w-full max-w-2xl mx-auto mb-6 px-2">
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className={`w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-lg transition duration-200 hover:shadow-lg ${
                        theme === "dark"
                            ? "bg-green-600 text-white hover:bg-green-500"
                            : "bg-green-200 text-gray-700 hover:bg-green-300"
                    }`}
                >
                    <FiUserPlus className="text-2xl" />
                    <span className="text-lg font-semibold">Add Contact</span>
                </button>
            )}

            {showForm && <ContactForm setShowForm={setShowForm} />}
        </div>
    );
};

export default AddContactButton;
