import { useMessages } from "../../../context/MessageContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import ConversationCard from "../ConversationCard/ConversationCard.jsx";
import { IoChatbubblesOutline } from "react-icons/io5";

const ConversationList = () => {
    const { conversations, setActiveConversation, activeConversation } = useMessages();
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col gap-3 p-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-3/4" />
                            <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!conversations.length) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center px-6">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    <IoChatbubblesOutline className="text-blue-300 text-2xl" />
                </div>
                <p className="text-sm text-gray-400 font-medium">No conversations yet</p>
                <p className="text-xs text-gray-300">Start a new chat to begin messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-800 px-4 py-3">Messages</h1>
            {conversations.map((conv) => (
                <div
                    key={conv._id}
                    onClick={() => setActiveConversation(conv)}
                    className={`cursor-pointer transition-colors ${activeConversation?._id === conv._id
                        ? "bg-blue-50 border-r-2 border-blue-500"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <ConversationCard
                        conversation={conv}
                        currentUserId={user.id}
                        isActive={activeConversation?._id === conv._id}
                    />
                </div>
            ))}
        </div>
    );
};

export default ConversationList;
