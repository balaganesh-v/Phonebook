import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useTheme } from "../context/ThemeContext";
import { FiPhone} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactCard = ({ contact }) => {
    const { theme } = useTheme();
    const { setEditingContact, deleteContact } = useContacts();

    const [loadingCall, setLoadingCall] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

    const handleCall = (phone) => {
        setLoadingCall(true);
        setTimeout(() => {
            window.location.href = `tel:${phone}`;
            setLoadingCall(false);
        }, 500);
    };

    const handleWhatsApp = (phone) => {
        if (!phone) return;
        setLoadingWhatsApp(true);
        setTimeout(() => {
            const formattedPhone = phone.replace(/[^0-9]/g, ""); // remove non-numeric
            window.open(`https://wa.me/${formattedPhone}`, "_blank");
            setLoadingWhatsApp(false);
        }, 300);
    };

    const handleEdit = (contact) => {
        setLoadingEdit(true);
        setEditingContact(contact);
        setTimeout(() => setLoadingEdit(false), 300);
    };

    const handleDelete = async (id) => {
        setLoadingDelete(true);
        try {
            await deleteContact(id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingDelete(false);
        }
    };

    const initial = contact.name ? contact.name.charAt(0).toUpperCase() : "?";

    return (
        <div
            className={`p-3 rounded-lg shadow mb-3 transition
                flex flex-col sm:flex-row gap-3
                hover:shadow-md
                ${theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
        >
            {/* LEFT CONTENT: Avatar + Name */}
            <div className="flex items-center flex-1 min-w-0 gap-3">
                {/* Avatar */}
                <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg flex-shrink-0 ${theme === "dark"
                            ? "bg-gray-500 text-white hover:bg-gray-400"
                            : "bg-gray-400 text-white hover:bg-gray-500"
                        }`}
                >
                    {initial}
                </div>

                {/* Name + Phone */}
                <div className="min-w-0">
                    <p
                        className={`font-semibold truncate ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                        title={contact.name}
                    >
                        {contact.name}
                    </p>
                    <p
                        className={`text-sm truncate ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        {contact.phone || "No phone number"}
                    </p>
                </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <button
                    onClick={() => handleCall(contact.phone)}
                    className="px-2 py-1 font-semibold text-green-500 rounded hover:bg-green-100 transition"
                    disabled={loadingCall}
                >
                    {loadingCall ? "Calling..." : <>Call <FiPhone className="inline ml-1 mb-0.5" /></>}
                </button>

                <button
                    onClick={() => handleWhatsApp(contact.phone)}
                    className="px-2 py-1 font-semibold text-green-600 rounded hover:bg-white transition"
                    disabled={loadingWhatsApp || !contact.phone}
                    title={!contact.phone ? "Phone number not available" : "Send WhatsApp message"}
                >
                    {loadingWhatsApp ? "Opening..." : <><FaWhatsapp className="inline ml-1 mr-1 text-2xl mb-0.5" /></>}
                </button>

                <button
                    onClick={() => handleEdit(contact)}
                    className="px-3 py-1 font-semibold text-orange-500 rounded hover:bg-orange-100 transition"
                    disabled={loadingEdit}
                >
                    {loadingEdit ? "Loading..." : "Edit"}
                </button>

                <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-3 py-1 font-semibold text-red-500 rounded hover:bg-red-100 transition"
                    disabled={loadingDelete}
                >
                    {loadingDelete ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
