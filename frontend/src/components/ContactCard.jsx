import { useContacts } from "../hooks/useContacts";
import { useTheme } from "../context/ThemeContext"

const ContactCard = ({ contact }) => {
    const {theme} = useTheme();

    const { setEditingContact, deleteContact } = useContacts();

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <div className={`p-3 rounded-lg shadow flex justify-between items-center hover:shadow-lg
            ${theme === "dark" ? "bg-gray-200 text-white" : "bg-gray-200"}`}>
            <div >
                <p className={`font-semibold ${theme === "dark"
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}>{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => handleCall(contact.phone) }
                    className="px-3 py-1 font-semibold text-green-500 rounded hover:bg-green-100"
                >
                    Call 📞
                </button>
                <button
                    onClick={() => setEditingContact(contact)}
                    className="px-3 py-1 font-semibold text-orange-500 rounded hover:bg-orange-100"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteContact(contact._id)}
                    className="px-3 py-1 fontsemibold text-red-500 rounded hover:bg-red-100"
                >
                    Delete
                </button>
                
            </div>
        </div>
    );
};

export default ContactCard;
