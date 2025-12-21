import { useState } from "react";
import { FiPhone, FiMoreVertical } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";

const ContactActions = ({ contact }) => {
    const [loadingCall, setLoadingCall] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Normal Phone Call
    const handlePhoneCall = () => {
        if (!contact.phone) {
            console.error("No phone number available for this contact.");
            return;
        }
        setLoadingCall(true);
        setTimeout(() => {
            window.location.href = `tel:${contact.phone}`;
            setLoadingCall(false);
        }, 300);
    };

    const handleEditing = () => {
        setEditing(true);
        // Editing logic to be implemented
    };

    const handleDeleting = () => {
        setDeleting(true);
        // Deleting logic to be implemented
    };

    return (
        <>
            <div className="relative flex items-center">
                {/* Desktop Buttons */}
                <div className="hidden sm:flex flex-wrap gap-3">

                    {/* Call Button */}
                    <button
                        onClick={handlePhoneCall}
                        disabled={loadingCall}
                        className={`px-3 py-1 rounded font-medium flex items-center gap-2
                            ${loadingCall
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-green-600 hover:bg-green-100"
                            }`}
                    >
                        {loadingCall ? (
                            "Calling..."
                        ) : (
                            <>
                                <FiPhone className="text-xl" />
                                Call
                            </>
                        )}
                    </button>

                    {/* Edit Button */}
                    <button
                        onClick={handleEditing}
                        disabled={editing}
                        className={`px-3 py-1 rounded font-medium flex items-center gap-2
                            ${editing
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-orange-600 hover:bg-orange-100"
                            }`}
                    >
                        {editing ? (
                            "Editing..."
                        ) : (
                            <>
                                <FaEdit className="text-xl text-orange-500" />
                                Edit Contact
                            </>
                        )}
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDeleting}
                        disabled={deleting}
                        className={`px-3 py-1 rounded font-medium flex items-center gap-2
                            ${deleting
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:bg-red-100"
                            }`}
                    >
                        {deleting ? (
                            "Deleting..."
                        ) : (
                            <>
                                <FaTrash className="text-lg text-red-600" />
                                Delete Contact
                            </>
                        )}
                    </button>

                </div>
            </div>

            {/* Mobile Three-Dot Menu */}
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
                            className="px-3 py-2 text-left text-green-600 hover:bg-green-50 disabled:text-gray-400"
                        >
                            {loadingCall ? "Calling..." : "Call"}
                        </button>

                        <button
                            onClick={handleEditing}
                            disabled={editing}
                            className="px-3 py-2 text-left text-orange-600 hover:bg-orange-50 disabled:text-gray-400"
                        >
                            {editing ? "Editing..." : "Edit Contact"}
                        </button>

                        <button
                            onClick={handleDeleting}
                            disabled={deleting}
                            className="px-3 py-2 text-left text-red-600 hover:bg-red-50 disabled:text-gray-400"
                        >
                            {deleting ? "Deleting..." : "Delete Contact"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactActions;
