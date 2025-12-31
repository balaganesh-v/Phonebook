import ConversationList from "./ConversationList/ConversationList";
import ChatWindow from "./ChatWindow/ChatWindow";

const MessagesPage = () => {
    return (
        <div className="h-full w-full p-4 bg-gray-100">
            <div className="flex h-full w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

                {/* Left: Conversations */}
                <div className="w-1/3 max-w-sm bg-gray-50 flex flex-col border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200 font-semibold text-gray-700 bg-white">
                        Conversations
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <ConversationList />
                    </div>
                </div>

                {/* Right: Chat Window */}
                <div className="flex-1 bg-white flex flex-col">
                    <ChatWindow />
                </div>

            </div>
        </div>
    );
};

export default MessagesPage;
