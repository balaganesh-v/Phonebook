import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { BsCheckAll, BsCheck } from "react-icons/bs";

import { useMessages } from "../../../hooks/useMessages.js";
import { useAuth } from "../../../hooks/useAuth.js";
import { useSocket } from "../../../hooks/useSocket.js";

import { formatTime, groupMessagesByDate } from "../../../utils/chatHelpers.js";

const ChatWindow = () => {
    const { user } = useAuth();
    const { messages, sendMessage, activeConversation, typingUser } = useMessages();
    const { sendTypingStatus, sendSeenStatus } = useSocket();

    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!messages.length || !activeConversation || !user?.id) return;
        const lastMsg = messages[messages.length - 1];
        const senderId = typeof lastMsg.sender === "object" ? lastMsg.sender._id : lastMsg.sender;
        if (senderId !== user.id && !lastMsg.seen) {
            sendSeenStatus({ conversationId: activeConversation._id, messageId: lastMsg._id });
        }
    }, [messages, activeConversation, user, sendSeenStatus]);

    const handleTyping = (e) => {
        setText(e.target.value);
        sendTypingStatus({ conversationId: activeConversation._id, isTyping: true });
        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            sendTypingStatus({ conversationId: activeConversation._id, isTyping: false });
        }, 1000);
    };

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText("");
    };

    const otherParticipant = activeConversation?.participants?.find(
        (p) => (typeof p === "object" ? p._id : p) !== user?.id
    );
    const otherName =
        typeof otherParticipant === "object"
            ? `${otherParticipant.firstName ?? ""} ${otherParticipant.lastName ?? ""}`.trim()
            : "";
    const initials = otherName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const grouped = activeConversation ? groupMessagesByDate(messages) : [];

    return (
        <div className="flex flex-col h-full bg-slate-900 overflow-hidden">

            {/* ── TOP BAR ── */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-700 bg-slate-800 shadow-sm shrink-0">
                {activeConversation ? (
                    <>
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0">
                            {initials || "?"}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white text-sm leading-tight">
                                {otherName || "Chat"}
                            </span>
                            {typingUser ? (
                                <span className="text-xs text-emerald-400 italic">Typing...</span>
                            ) : (
                                <span className="text-xs text-emerald-400">● Online</span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className="text-sm text-slate-400 font-medium">No conversation selected</span>
                )}
            </div>

            {/* ── BODY ── */}
            {!activeConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <IoSend className="text-emerald-500 text-2xl" />
                    </div>
                    <p className="text-sm font-medium text-slate-400">
                        Select a conversation to start chatting
                    </p>
                </div>
            ) : (
                <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-slate-900">
                        {grouped.map((item) => {
                            if (item.type === "date-label") {
                                return (
                                    <div key={item.id} className="flex items-center gap-3 my-4">
                                        <div className="flex-1 h-px bg-slate-700" />
                                        <span className="text-xs text-slate-500 font-medium px-2 whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <div className="flex-1 h-px bg-slate-700" />
                                    </div>
                                );
                            }

                            const msg = item;
                            const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
                            const isMe = senderId === user.id;

                            return (
                                <div
                                    key={msg._id}
                                    className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
                                >
                                    <div className={`flex flex-col max-w-[68%] ${isMe ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl text-sm break-words leading-relaxed shadow-sm
                                                ${isMe
                                                    ? "bg-emerald-500 text-slate-900 font-medium rounded-br-md"
                                                    : "bg-slate-800 text-slate-100 rounded-bl-md border border-slate-700"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                        <div className={`flex items-center gap-1 mt-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                            <span className="text-[10px] text-slate-500">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                            {isMe && (
                                                msg.seen
                                                    ? <BsCheckAll className="text-emerald-400 text-xs" />
                                                    : <BsCheck className="text-slate-500 text-xs" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Typing indicator */}
                    {typingUser && (
                        <div className="px-5 pb-1 text-xs italic text-slate-500 shrink-0">
                            Typing...
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-slate-700 bg-slate-800 flex items-center gap-2 shrink-0">
                        <input
                            value={text}
                            onChange={handleTyping}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-full outline-none transition-colors placeholder-slate-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!text.trim()}
                            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 flex items-center justify-center transition-all shrink-0"
                        >
                            <IoSend className="text-sm" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatWindow;