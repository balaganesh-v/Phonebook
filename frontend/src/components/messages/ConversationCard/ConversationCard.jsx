const ConversationCard = ({ conversation, currentUserId, onClick }) => {
    const otherParticipant = conversation.participants.find(
        p => p._id !== currentUserId
    );

    const displayName = otherParticipant?.name || otherParticipant?.phone || "Unknown User";

    return (
        <div
            onClick={onClick}
            className="p-4 border-b cursor-pointer hover:bg-gray-100 transition"
        >
            <div className="font-semibold text-gray-800">{displayName}</div>
            <div className="text-sm text-gray-500 truncate">
                {conversation.lastMessage?.content || "Start a conversation"}
            </div>
        </div>
    );
};

export default ConversationCard;
