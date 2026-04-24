import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { BsCheckAll, BsCheck } from "react-icons/bs";

import { useMessages } from "../../../../hooks/useMessages.js";
import { useAuth } from "../../../../hooks/useAuth.js";
import { formatTime, groupMessagesByDate } from "../../../../utils/chatHelpers.js";

const ChatWindow = () => {
    
    const { user } = useAuth();
    const { messages,sendMessage,activeConversation } = useMessages();

    const [text, setText] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "auto",
                block: "end",
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [messages, activeConversation]);

    const handleSend = () => {
        if (!text.trim()) return;

        sendMessage(text);
        setText("");
    };

    const grouped = activeConversation
        ? groupMessagesByDate(messages)
        : [];

    if (!activeConversation) {
        return (
            <div className="h-full flex items-center justify-center bg-black text-zinc-500">
                Select a conversation
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-black">

            {/* Header */}
            <div className="px-5 py-4 border-b border-orange-500/10 bg-zinc-950 shrink-0 text-white font-medium">
                Chat
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 min-h-0">

                {grouped.map((item) => {
                    if (item.type === "date-label") {
                        return (
                            <div key={item.id} className="text-center">
                                <span className="text-[11px] text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full">
                                    {item.label}
                                </span>
                            </div>
                        );
                    }

                    const msg = item;

                    const senderId =
                        typeof msg.sender === "object"
                            ? msg.sender._id
                            : msg.sender;

                    const isMe = senderId === user.id;

                    return (
                        <div
                            key={msg._id}
                            className={`flex ${
                                isMe
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div className="max-w-[72%]">

                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm break-words ${
                                        isMe
                                            ? "bg-orange-400 text-black rounded-br-md"
                                            : "bg-zinc-900 text-white border border-orange-500/10 rounded-bl-md"
                                    }`}
                                >
                                    {msg.content}
                                </div>

                                <div className="flex items-center gap-1 mt-1 px-1">
                                    <span className="text-[10px] text-zinc-500">
                                        {formatTime(msg.createdAt)}
                                    </span>

                                    {isMe &&
                                        (msg.seen ? (
                                            <BsCheckAll className="text-orange-400 text-xs" />
                                        ) : (
                                            <BsCheck className="text-zinc-600 text-xs" />
                                        ))}
                                </div>

                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />

            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-orange-500/10 bg-zinc-950 flex items-center gap-2 shrink-0">

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSend()
                    }
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-black border border-zinc-800 focus:border-orange-400 text-white text-sm rounded-full outline-none"
                />

                <button
                    onClick={handleSend}
                    className="w-11 h-11 rounded-full bg-orange-400 hover:bg-orange-300 text-black flex items-center justify-center"
                >
                    <IoSend />
                </button>

            </div>

        </div>
    );
};

export default ChatWindow;