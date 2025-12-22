import { useTheme } from "../../../context/ThemeContext";
import { useSocket } from "../../../context/SocketContext";
import ContactInfo from "./ContactInfo";
import ContactActions from "./ContactActions";
import ContactAvatar from "./ContactAvatar";

const ContactCard = ({ contact, onEdit }) => {
    const { theme } = useTheme();
    const { onlineUsers } = useSocket(); // ✅ get online users

    // ✅ check if this contact is online
    const isOnline = onlineUsers.includes(contact._id);

    return (
        <div
            className={`p-3 rounded-lg shadow mb-3 transition
                flex flex-col sm:flex-row gap-3
                hover:shadow-md
                ${
                    theme === "dark"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
        >
            {/* ✅ pass online status */}
            <ContactAvatar
                name={contact.name}
                isOnline={isOnline}
            />

            <div className="flex items-center flex-1 min-w-0 gap-3">
                <ContactInfo
                    name={contact.name}
                    phone={contact.phone}
                />
            </div>

            <ContactActions
                contact={contact}
                onEdit={onEdit}
            />
        </div>
    );
};

export default ContactCard;
