import { FiPhone } from "react-icons/fi";
import { FaPhone, FaEdit, FaTrash, FaComments } from "react-icons/fa";
import { useContacts } from "../../../context/ContactContext.jsx";
import { useSocket } from "../../../context/SocketContext.jsx";
import { useMessages } from "../../../context/MessagesContext.jsx";
import { useNavigate } from "react-router-dom";

const ContactActions = ({ contact, onEdit }) => {
    const navigate = useNavigate();

    const { socket, me } = useSocket();
    const { deleteContact } = useContacts();
    const { openChatWithContact } = useMessages();

    // Safety check
    if (!contact){
        return null;
    }

    const handleYuhCall = () => {
        if (!socket || !me?.user?.id) return;

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
        if (!contact?._id) return;

        openChatWithContact(contact);
        navigate("/messages");
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            deleteContact(contact._id);
        }
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={handlePhoneCall}
                className="px-3 py-1 text-green-600 hover:bg-green-100 rounded flex items-center gap-2"
            >
                <FaPhone /> Call
            </button>

            <button
                onClick={handleYuhCall}
                className="px-3 py-1 text-green-600 hover:bg-green-100 rounded flex items-center gap-2"
            >
                <FiPhone /> yuh❤️!!
            </button>

            <button
                onClick={handleYuhChat}
                className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded flex items-center gap-2"
            >
                <FaComments /> yuh❤️!!
            </button>

            <button
                onClick={() => onEdit(contact)}
                className="px-3 py-1 text-orange-600 hover:bg-orange-100 rounded flex items-center gap-2"
            >
                <FaEdit /> Edit
            </button>

            <button
                onClick={handleDelete}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded flex items-center gap-2"
            >
                <FaTrash /> Delete
            </button>
        </div>
    );
};

export default ContactActions;
