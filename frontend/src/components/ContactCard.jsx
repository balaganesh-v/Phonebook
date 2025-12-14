import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useTheme } from "../context/ThemeContext";

const ContactCard = ({ contact }) => {
    const { theme } = useTheme();
    const { setEditingContact, deleteContact } = useContacts();

    // Loading states
    const [loadingCall, setLoadingCall] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleCall = (phone) => {
        setLoadingCall(true);
        // simulate call delay
        setTimeout(() => {
            window.location.href = `tel:${phone}`;
            setLoadingCall(false);
        }, 500);
    };

    const handleEdit = (contact) => {
        setLoadingEdit(true);
        setEditingContact(contact);
        setTimeout(() => setLoadingEdit(false), 300); // simulate a small delay
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

    return (
        <div
            className={`p-3 rounded-lg shadow mb-3 transition
                flex flex-col gap-3
                sm:flex-row xs:flex-row
                hover:shadow-md
                ${theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
        >
            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0 sm:mr-4 xs:mr-4">
                <p
                    className={`font-semibold truncate
                        ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    title={contact.name}
                >
                    {contact.name}
                </p>
                <p
                    className={`text-sm truncate
                        ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                    {contact.phone}
                </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-2">
                <button
                    onClick={() => handleCall(contact.phone)}
                    className="px-3 py-1 font-semibold text-green-500 rounded hover:bg-green-100"
                    disabled={loadingCall}
                >
                    {loadingCall ? "Calling..." : "Call 📞"}
                </button>

                <button
                    onClick={() => handleEdit(contact)}
                    className="px-3 py-1 font-semibold text-orange-500 rounded hover:bg-orange-100"
                    disabled={loadingEdit}
                >
                    {loadingEdit ? "Loading..." : "Edit"}
                </button>

                <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-3 py-1 font-semibold text-red-500 rounded hover:bg-red-100"
                    disabled={loadingDelete}
                >
                    {loadingDelete ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
