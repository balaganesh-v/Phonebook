import { useMessages } from "../../../context/MessagesContext";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import { useState, useRef, useEffect } from "react";

const ChatWindow = () => {
    const { user } = useAuth();
    const { messages, sendMessage, activeConversation, typingUser } = useMessages();
    const { sendTypingStatus, sendSeenStatus } = useSocket();

    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* 🔹 MARK SEEN */
    useEffect(() => {
        if (!messages.length || !activeConversation) return;

        const lastMsg = messages[messages.length - 1];
        if (lastMsg.sender !== user._id && !lastMsg.seen) {
            sendSeenStatus({
                conversationId: activeConversation._id,
                messageId: lastMsg._id
            });
        }
    }, [messages]);

    if (!activeConversation) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Select a conversation
            </div>
        );
    }

    const handleTyping = (e) => {
        setText(e.target.value);

        sendTypingStatus({
            conversationId: activeConversation._id,
            isTyping: true
        });

        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            sendTypingStatus({
                conversationId: activeConversation._id,
                isTyping: false
            });
        }, 1000);
    };

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText("");
    };

    return (
        <div className="flex flex-col h-full bg-white">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                    const isMe = msg.sender === user._id;

                    return (
                        <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className="flex flex-col max-w-[70%]">
                                <div
                                    className={`p-3 rounded-lg text-sm
                                    ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                                >
                                    {msg.content}
                                </div>

                                {isMe && (
                                    <span className="text-xs text-gray-400 text-right mt-1">
                                        {msg.seen ? "✓✓ Seen" : "✓ Sent"}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Typing */}
            {typingUser && (
                <div className="px-4 text-sm italic text-gray-500">
                    Typing...
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <input
                    value={text}
                    onChange={handleTyping}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-full"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-5 py-2 rounded-full"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
