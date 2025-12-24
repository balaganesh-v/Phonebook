import { useMessages } from "../../../context/MessagesContext";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
    const { activeConversation, messages, sendMessage } = useMessages();

    if (!activeConversation) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Select a conversation
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b font-semibold">
                {activeConversation.name}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-2 p-2 max-w-xs rounded ${
                            msg.isMine
                                ? "ml-auto bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <MessageInput onSend={sendMessage} />
        </div>
    );
};

export default ChatWindow;
