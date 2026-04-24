import { IoChatbubblesOutline } from "react-icons/io5";
import { useMessages } from "../../../../hooks/useMessages.js";
import { useAuth } from "../../../../hooks/useAuth.js";
import ConversationCard from "../card/ConversationCard.jsx";

const ConversationList = () => {
    const { conversations,setActiveConversation,activeConversation } = useMessages();
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full bg-black">
                <div className="w-6 h-6 border-2 border-zinc-700 border-t-orange-400 rounded-full animate-spin" />
            </div>
        );
    }

    if (!conversations.length) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-black gap-3 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-orange-500/10 flex items-center justify-center">
                    <IoChatbubblesOutline className="text-orange-400 text-2xl" />
                </div>

                <p className="text-white text-sm font-medium">
                    No conversations yet
                </p>

                <p className="text-zinc-500 text-xs">
                    Start a chat now
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-black">

            <div className="px-4 py-4 border-b border-orange-500/10 shrink-0">
                <h1 className="text-white text-lg font-semibold">
                    Messages
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
                {conversations.map((conv) => (
                    <div
                        key={conv._id}
                        onClick={() => setActiveConversation(conv)}
                        className={`cursor-pointer transition-all ${
                            activeConversation?._id === conv._id
                                ? "bg-zinc-900 border-r-2 border-orange-400"
                                : "hover:bg-zinc-950"
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

        </div>
    );
};

export default ConversationList;