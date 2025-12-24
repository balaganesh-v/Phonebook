import { useContacts } from "../../../context/ContactsContext";

const ConversationCard = ({ conversation, onClick, currentUserId }) => {
    const { contacts } = useContacts();

    // Get the other participant (exclude current user)
    const otherUserId = conversation.participants.find(
        (id) => id !== currentUserId
    );

    // Get contact details
    const contact = contacts.find((c) => c._id === otherUserId);
    const conversationName = contact?.name || "Unnamed Conversation";

    // Last message text
    const lastMessage = conversation.lastMessage?.content || "Start a new conversation!";

    return (
        <div
            onClick={onClick}
            className="p-4 cursor-pointer border-b hover:bg-gray-100 transition-colors duration-150"
        >
            <div className="font-semibold text-gray-800 truncate">
                {conversationName}
            </div>
            <div className="text-sm text-gray-500 truncate mt-1">
                {lastMessage}
            </div>
        </div>
    );
};

export default ConversationCard;
