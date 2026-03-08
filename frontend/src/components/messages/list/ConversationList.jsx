import { IoChatbubblesOutline } from "react-icons/io5";

import { useMessages } from "../../../hooks/useMessages.js";
import { useAuth } from "../../../hooks/useAuth.js";

import ConversationCard from "../card/ConversationCard.jsx";

const ConversationList = () => {
    const { conversations, setActiveConversation, activeConversation } = useMessages();
    const { user } = useAuth();

    // Loading skeleton
    if (!user) {
        return (
            <div className="flex flex-col gap-3 p-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="w-11 h-11 rounded-full bg-slate-700 shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-slate-700 rounded w-3/4" />
                            <div className="h-2.5 bg-slate-800 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (!conversations.length) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center px-6">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <IoChatbubblesOutline className="text-emerald-500 text-2xl" />
                </div>
                <p className="text-sm text-slate-400 font-medium">No conversations yet</p>
                <p className="text-xs text-slate-500">Start a new chat to begin messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-slate-900 h-full">
            <h1 className="text-lg font-bold text-white px-4 py-4 border-b border-slate-700">
                Messages
            </h1>
            {conversations.map((conv) => (
                <div
                    key={conv._id}
                    onClick={() => setActiveConversation(conv)}
                    className={`cursor-pointer transition-colors ${activeConversation?._id === conv._id
                            ? "bg-slate-800 border-r-2 border-emerald-500"
                            : "hover:bg-slate-800"
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