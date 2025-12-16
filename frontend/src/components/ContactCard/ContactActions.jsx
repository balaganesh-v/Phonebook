import { useState } from "react";
import { FiPhone, FiMoreVertical } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { socket } from "../../socket";
import { useContacts } from "../../context/ContactContext";

const ContactActions = ({ contact, myContactId }) => {
    const { setEditingContact, deleteContact } = useContacts();

    const [loadingCall, setLoadingCall] = useState(false);
    const [loadingLiveCall, setLoadingLiveCall] = useState(false);
    const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    // Normal Phone Call
    const handlePhoneCall = () => {
        if (!contact.phone) return;
        setLoadingCall(true);
        setTimeout(() => {
            window.location.href = `tel:${contact.phone}`;
            setLoadingCall(false);
        }, 300);
    };

    // Live Call
    const handleLiveCall = () => {
        setLoadingLiveCall(true);
        socket.emit("call-user", {
            callerId: myContactId,
            receiverId: contact._id,
            callType: "voice",
        });
        setTimeout(() => setLoadingLiveCall(false), 500);
    };

    // WhatsApp
    const handleWhatsApp = () => {
        if (!contact.phone) return;
        setLoadingWhatsApp(true);
        const phoneNumber = contact.phone.replace(/[^0-9]/g, "");
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
        setLoadingWhatsApp(false);
    };

    // Edit
    const handleEdit = () => {
        setLoadingEdit(true);
        setEditingContact(contact);
        setTimeout(() => setLoadingEdit(false), 300);
    };

    // Delete
    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            await deleteContact(contact._id);
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div className="relative flex items-center">
            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-wrap gap-3">
                <button
                    onClick={handlePhoneCall}
                    disabled={loadingCall}
                    className="px-3 py-1 text-green-600 font-medium rounded hover:bg-green-100"
                >
                    {loadingCall ? "Calling..." : <><FiPhone className="inline mr-1" />Call</>}
                </button>

                <button
                    onClick={handleLiveCall}
                    disabled={loadingLiveCall}
                    className="px-3 py-1 text-teal-600 font-medium rounded hover:bg-teal-100"
                >
                    {loadingLiveCall ? "Connecting..." : "Live Call"}
                </button>

                <button
                    onClick={handleWhatsApp}
                    disabled={loadingWhatsApp || !contact.phone}
                    className="px-3 py-1 text-green-700 font-medium rounded hover:bg-green-100"
                >
                    {loadingWhatsApp ? "Opening..." : <><FaWhatsapp className="inline mr-1 text-lg" />WhatsApp</>}
                </button>

                <button
                    onClick={handleEdit}
                    disabled={loadingEdit}
                    className="px-3 py-1 text-orange-600 font-medium rounded hover:bg-orange-100"
                >
                    {loadingEdit ? "Loading..." : "Edit Contact"}
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loadingDelete}
                    className="px-3 py-1 text-red-600 font-medium rounded hover:bg-red-100"
                >
                    {loadingDelete ? "Deleting..." : "Delete Contact"}
                </button>
            </div>

            {/* Mobile Three-Dot Menu Only */}
            <div className="sm:hidden relative">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                    <FiMoreVertical className="text-lg" />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg flex flex-col z-50">
                        <button
                            onClick={handlePhoneCall}
                            disabled={loadingCall}
                            className="px-3 py-2 text-left text-green-600 hover:bg-green-50"
                        >
                            {loadingCall ? "Calling..." : "Call"}
                        </button>

                        <button
                            onClick={handleLiveCall}
                            disabled={loadingLiveCall}
                            className="px-3 py-2 text-left text-teal-600 hover:bg-teal-50"
                        >
                            {loadingLiveCall ? "Connecting..." : "Live Call"}
                        </button>

                        <button
                            onClick={handleWhatsApp}
                            disabled={loadingWhatsApp || !contact.phone}
                            className="px-3 py-2 text-left text-green-700 hover:bg-green-50"
                        >
                            {loadingWhatsApp ? "Opening..." : "WhatsApp"}
                        </button>

                        <button
                            onClick={handleEdit}
                            disabled={loadingEdit}
                            className="px-3 py-2 text-left text-orange-600 hover:bg-orange-50"
                        >
                            {loadingEdit ? "Loading..." : "Edit Contact"}
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={loadingDelete}
                            className="px-3 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                            {loadingDelete ? "Deleting..." : "Delete Contact"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactActions;
