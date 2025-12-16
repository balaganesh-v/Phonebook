import { useState } from "react";
import { useContacts } from "../../context/ContactContext";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactActions = ({ contact }) => {
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
            const formattedPhone = phone.replace(/[^0-9]/g, "");
            window.open(`https://wa.me/${formattedPhone}`, "_blank");
            setLoadingWhatsApp(false);
        }, 300);
    };

    const handleEdit = () => {
        setLoadingEdit(true);
        setEditingContact(contact);
        setTimeout(() => setLoadingEdit(false), 300);
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            await deleteContact(contact._id);
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <button
                onClick={() => handleCall(contact.phone)}
                disabled={loadingCall}
                className="px-2 py-1 font-semibold text-green-500 rounded hover:bg-green-100"
            >
                {loadingCall ? "Calling..." : <>Call <FiPhone className="inline ml-1" /></>}
            </button>

            <button
                onClick={() => handleWhatsApp(contact.phone)}
                disabled={loadingWhatsApp || !contact.phone}
                className="px-2 py-1 font-semibold text-green-600 rounded hover:bg-white"
            >
                {loadingWhatsApp ? "Opening..." : <FaWhatsapp className="text-2xl" />}
            </button>

            <button
                onClick={handleEdit}
                disabled={loadingEdit}
                className="px-3 py-1 font-semibold text-orange-500 rounded hover:bg-orange-100"
            >
                {loadingEdit ? "Loading..." : "Edit"}
            </button>

            <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className="px-3 py-1 font-semibold text-red-500 rounded hover:bg-red-100"
            >
                {loadingDelete ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
};

export default ContactActions;
