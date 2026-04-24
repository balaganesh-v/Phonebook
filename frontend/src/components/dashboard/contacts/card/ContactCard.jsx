import ContactInfo from "./ContactInfo.jsx";
import ContactActions from "./ContactActions.jsx";
import ContactAvatar from "./ContactAvatar.jsx";

import { useSocket } from "../../../../hooks/useSocket.js";

const ContactCard = ({ contact, onEdit }) => {
    const { onlineUsers } = useSocket();

    const isOnline = onlineUsers.includes(contact._id);

    return (
        <div className="group rounded-2xl border border-white/5 bg-black hover:bg-zinc-950 hover:border-amber-400/20 px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300">

            {/* Avatar */}
            <ContactAvatar
                name={contact.name}
                isOnline={isOnline}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <ContactInfo
                    name={contact.name}
                    phone={contact.phone}
                />
            </div>

            {/* Actions */}
            <div className="w-full sm:w-auto">
                <ContactActions
                    contact={contact}
                    onEdit={onEdit}
                />
            </div>

        </div>
    );
};

export default ContactCard;