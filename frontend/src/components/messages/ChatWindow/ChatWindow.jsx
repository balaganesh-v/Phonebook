import { useMessages } from "../../../context/MessagesContext";
import { useAuth } from "../../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const ChatWindow = () => {
    const { user } = useAuth();
    const { messages, sendMessage, activeConversation } = useMessages();
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // No conversation selected
    if (!activeConversation) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 text-lg">
                Select a conversation to start chatting
            </div>
        );
    }

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText("");
    };

    const otherParticipant = activeConversation.participants.find(
        p => p._id !== user._id
    );

    return (
        <div className="flex flex-col h-full border-l border-gray-200 bg-white rounded-r-lg">

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {otherParticipant?.name?.charAt(0) || "U"}
                </div>
                <div className="text-gray-800 font-semibold text-lg">
                    {otherParticipant?.name || otherParticipant?.phone || "Chat"}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, idx) => {
                    const senderId =
                        typeof msg.sender === "object"
                            ? msg.sender._id
                            : msg.sender;

                    const isMe = senderId === user._id;

                    return (
                        <div
                            key={idx}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-[70%] text-sm break-words
                                ${isMe
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex gap-3 items-center">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
