import { FiPhone } from "react-icons/fi";
import { FaPhone, FaEdit, FaTrash, FaComments } from "react-icons/fa"; // added FaComments
import { useContacts } from "../../../context/ContactContext.jsx";
import { useSocket } from "../../../context/SocketContext.jsx";

const ContactActions = ({ contact, onEdit }) => {

    const { socket, me } = useSocket();
    const { deleteContact } = useContacts();

    const handleYuhCall = () => {
        socket.emit("call-user", {
            from: me.user.id,     
            to: contact._id       
        });
    };

    const handlePhoneCall = () => {
        if (!contact.phone) return;
        window.location.href = `tel:${contact.phone}`;
    };

    const handleYuhChat = () => {
        // You can emit a socket event or navigate to the chat page
        socket.emit("start-chat", {
            from: me.user.id,
            to: contact._id
        });
    };

    return (
        <div className="flex gap-3">
            {/* Phone Call */}
            <button
                onClick={handlePhoneCall}
                className="px-3 py-1 text-green-600 hover:bg-green-100 rounded flex items-center gap-2"
            >
                <FaPhone />
                Call
            </button>

            {/* Yuhnie Call */}
            <button
                onClick={handleYuhCall}
                className="px-3 py-1 text-green-600 hover:bg-green-100 rounded flex items-center gap-2"
            >
                <FiPhone />
                yuh❤️!!
            </button>

            {/* Yuhnie Chat */}
            <button
                onClick={handleYuhChat}
                className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded flex items-center gap-2"
            >
                <FaComments />
                yuh❤️!!
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
