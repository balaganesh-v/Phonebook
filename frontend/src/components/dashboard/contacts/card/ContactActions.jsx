import { FiPhone } from "react-icons/fi";
import { FaPhone, FaEdit, FaTrash, FaComments } from "react-icons/fa";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useContacts } from "../../../../hooks/useContacts.js";
import { useSocket } from "../../../../hooks/useSocket.js";
import { useMessages } from "../../../../hooks/useMessages.js";
import { useFavourites } from "../../../../hooks/useFavourites.js";

const ContactActions = ({ contact, onEdit }) => {
    const navigate = useNavigate();

    const { socket, me } = useSocket();
    const { deleteContact } = useContacts();
    const { openChatWithContact } = useMessages();

    const {
        isContactFavourited,
        addToContactFavourites,
        removeFromContactFavourites,
    } = useFavourites();

    if (!contact) return null;

    const isStarred = isContactFavourited(contact._id);

    const toggleFavourite = () => {
        if (isStarred) {
            removeFromContactFavourites(contact._id);
        } else {
            addToContactFavourites(contact._id);
        }
    };

    const handleYuhCall = () => {
        if (!socket || !me?.user?.id) return;

        socket.emit("call-user", {
            from: me.user.id,
            to: contact._id,
        });
    };

    const handlePhoneCall = () => {
        if (!contact.phone) return;
        window.location.href = `tel:${contact.phone}`;
    };

    const handleYuhChat = async () => {
        try {
            await openChatWithContact(contact);
            navigate("/dashboard/messages");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Delete this contact?")) {
            deleteContact(contact._id);
        }
    };

    const btn =
        "flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl border transition-all duration-300";

    return (
        <div className="flex flex-wrap gap-2">

            {/* Favourite */}
            <button
                onClick={toggleFavourite}
                className={`${btn} ${
                    isStarred
                        ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
                        : "text-zinc-400 border-white/10 hover:text-amber-300 hover:border-amber-400/20"
                }`}
            >
                <Star
                    size={13}
                    fill={isStarred ? "#fbbf24" : "none"}
                />
                Fav
            </button>

            {/* Phone */}
            <button
                onClick={handlePhoneCall}
                className={`${btn} text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10`}
            >
                <FaPhone size={11} />
                Call
            </button>

            {/* Yuh Call */}
            <button
                onClick={handleYuhCall}
                className={`${btn} text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10`}
            >
                <FiPhone size={11} />
                Yuh Call
            </button>

            {/* Chat */}
            <button
                onClick={handleYuhChat}
                className={`${btn} text-sky-400 border-sky-500/20 hover:bg-sky-500/10`}
            >
                <FaComments size={11} />
                Chat
            </button>

            {/* Edit */}
            <button
                onClick={() => onEdit(contact)}
                className={`${btn} text-orange-400 border-orange-500/20 hover:bg-orange-500/10`}
            >
                <FaEdit size={11} />
                Edit
            </button>

            {/* Delete */}
            <button
                onClick={handleDelete}
                className={`${btn} text-red-400 border-red-500/20 hover:bg-red-500/10`}
            >
                <FaTrash size={11} />
                Delete
            </button>

        </div>
    );
};

export default ContactActions;