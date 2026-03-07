import ConversationList from "./ConversationList/ConversationList.jsx";
import ChatWindow from "./ChatWindow/ChatWindow.jsx";

const MessagesPage = () => {
    return (
        <div className="flex h-full w-full overflow-hidden">

            {/* Left: Conversations */}
            <div className="w-1/3 max-w-sm bg-gray-50 flex flex-col border-r border-gray-200">
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <ConversationList />
                </div>
            </div>

            {/* Right: Chat Window */}
            <div className="flex-1 bg-white flex flex-col">
                <ChatWindow />
            </div>

        </div>
    );
};

export default MessagesPage;