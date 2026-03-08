const ConversationCard = ({ conversation, currentUserId, isActive, onClick }) => {
    const otherParticipant = conversation.participants.find(
        (p) => p._id !== currentUserId
    );

    const displayName =
        otherParticipant?.name || otherParticipant?.phone || "Unknown User";

    const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const lastMessage = conversation.lastMessage?.content || "Start a conversation";

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 cursor-pointer"
        >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0">
                {initials || "?"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm truncate ${isActive ? "text-emerald-400" : "text-white"}`}>
                    {displayName}
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                    {lastMessage}
                </div>
            </div>
        </div>
    );
};

export default ConversationCard;