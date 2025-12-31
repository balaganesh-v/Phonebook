import { useMessages } from "../../../context/MessagesContext";
import { useAuth } from "../../../context/AuthContext";
import ConversationCard from "../ConversationCard/ConversationCard";

const ConversationList = () => {
    const { conversations, setActiveConversation } = useMessages();
    const { user } = useAuth();

    if (!conversations.length) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                No conversations yet. Start a new chat!
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            {conversations.map((conv) => (
                <ConversationCard
                    key={conv._id}
                    conversation={conv}
                    currentUserId={user._id}
                    onClick={() => setActiveConversation(conv)}
                />
            ))}
        </div>
    );
};

export default ConversationList;
