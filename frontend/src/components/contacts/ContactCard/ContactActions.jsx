import { FiPhone } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContacts } from "../../../context/ContactContext.jsx";

const ContactActions = ({ contact, onEdit }) => {

    const { deleteContact } = useContacts();

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
                onClick={() => onEdit(contact)}
                className="px-3 py-1 text-orange-600 hover:bg-orange-100 rounded flex items-center gap-2"
            >
                <FaEdit />
                Edit Contact
            </button>

            {/* Delete */}
            <button
                onClick={() => deleteContact(contact._id)}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded flex items-center gap-2"
            >
                <FaTrash />
                Delete Contact
            </button>
        </div>
    );
};

export default ContactActions;
