import { FiPhone } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContacts } from "../../../context/ContactContext";

const ContactActions = ({ contact }) => {
    const { setEditingContact } = useContacts();

    const handlePhoneCall = () => {
        if (!contact.phone) return;
        window.location.href = `tel:${contact.phone}`;
    };

    return (
        <div className="flex gap-3">
            {/* Call */}
            <button
                onClick={handlePhoneCall}
                className="px-3 py-1 text-green-600 hover:bg-green-100 rounded flex items-center gap-2"
            >
                <FiPhone />
                Call
            </button>

            {/* Edit */}
            <button
                onClick={() => setEditingContact(contact)}
                className="px-3 py-1 text-orange-600 hover:bg-orange-100 rounded flex items-center gap-2"
            >
                <FaEdit />
                Edit Contact
            </button>

            {/* Delete (Disabled – NO HANDLER) */}
            <button
                disabled
                className="px-3 py-1 text-gray-400 cursor-not-allowed rounded flex items-center gap-2"
            >
                <FaTrash />
                Delete Contact
            </button>
        </div>
    );
};

export default ContactActions;
