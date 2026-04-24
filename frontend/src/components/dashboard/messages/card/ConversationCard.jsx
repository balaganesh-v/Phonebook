import { Star } from "lucide-react";
import { useFavourites } from "../../../../hooks/useFavourites.js";

const ConversationCard = ({
    conversation,
    currentUserId,
    isActive,
    onClick,
}) => {
    const {
        isConversationFavourited,
        addToConversationFavourites,
        removeFromConversationFavourites,
    } = useFavourites();

    const otherUser = conversation.participants.find(
        (p) => String(p.userId) !== String(currentUserId)
    );

    const otherUserName =
        otherUser?.name || otherUser?.phone || "Unknown User";

    const otherUserInitials = otherUserName
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const lastMessagePreview =
        conversation.lastMessage?.content || "Start a conversation";

    const isStarred = isConversationFavourited(conversation._id);

    const toggleStar = (e) => {
        e.stopPropagation();

        if (isStarred) {
            removeFromConversationFavourites(conversation._id);
        } else {
            addToConversationFavourites(conversation._id);
        }
    };

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 border-b border-orange-500/10 cursor-pointer transition-all duration-200
                
                ${
                    isActive
                        ? "bg-zinc-900"
                        : "hover:bg-zinc-950"
                }`}
        >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-orange-400 flex items-center justify-center text-black font-bold text-sm shrink-0">
                {otherUserInitials || "?"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">

                <div
                    className={`text-sm truncate [font-family:'Poppins',sans-serif]
                    
                    ${
                        isActive
                            ? "text-orange-400 font-semibold"
                            : "text-white font-medium"
                    }`}
                >
                    {otherUserName}
                </div>

                <div className="text-xs text-zinc-500 truncate mt-1 [font-family:'Poppins',sans-serif]">
                    {lastMessagePreview}
                </div>

            </div>

            {/* Favourite */}
            <button
                onClick={toggleStar}
                className="p-1 rounded-md hover:bg-white/5 transition-colors"
            >
                <Star
                    size={16}
                    fill={isStarred ? "#fb923c" : "none"}
                    className={
                        isStarred
                            ? "text-orange-400"
                            : "text-zinc-600 hover:text-orange-400"
                    }
                />
            </button>
        </div>
    );
};

export default ConversationCard;