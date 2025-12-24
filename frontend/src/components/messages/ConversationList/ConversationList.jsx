import { useMessages } from "../../../context/MessagesContext";
import { useAuth } from "../../../context/AuthContext"; // Using your existing AuthContext
import ConversationCard from "../ConversationCard/ConversationCard";

const ConversationList = () => {
    const { conversations, setActiveConversation } = useMessages();
    const { user } = useAuth(); // Get current user from your existing AuthContext

    if (!conversations || conversations.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                No conversations yet. Start a new chat!
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto">
            {conversations.map((conv) => (
                <ConversationCard
                    key={conv._id}
                    conversation={conv}
                    currentUserId={user._id} // Pass current user ID
                    onClick={() => setActiveConversation(conv)}
                />
            ))}
        </div>
    );
};

export default ConversationList;
