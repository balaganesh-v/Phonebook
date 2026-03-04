import { useMessages } from "../../../context/MessageContext";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { BsCheckAll, BsCheck } from "react-icons/bs";

const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDateLabel = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
};

const groupMessagesByDate = (messages) => {
    const sorted = [...messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const groups = [];
    let lastLabel = null;
    sorted.forEach((msg) => {
        const label = formatDateLabel(msg.createdAt);
        if (label !== lastLabel) {
            groups.push({ type: "date-label", label, id: `label-${msg._id}` });
            lastLabel = label;
        }
        groups.push({ type: "message", ...msg });
    });
    return groups;
};

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

    // ── Derived values (safe even if activeConversation is null) ──
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
        <div className="flex flex-col h-full bg-white overflow-hidden">

            {/* ── TOP BAR — always visible ── */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white shadow-sm shrink-0">
                {activeConversation ? (
                    <>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            {initials || "?"}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 text-sm leading-tight">
                                {otherName || "Chat"}
                            </span>
                            {typingUser ? (
                                <span className="text-xs text-blue-500 italic">Typing...</span>
                            ) : (
                                <span className="text-xs text-green-400">Online</span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className="text-sm text-gray-400 font-medium">No conversation selected</span>
                )}
            </div>

            {/* ── BODY ── */}
            {!activeConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <IoSend className="text-blue-300 text-2xl" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">
                        Select a conversation to start chatting
                    </p>
                </div>
            ) : (
                <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
                        {grouped.map((item) => {
                            if (item.type === "date-label") {
                                return (
                                    <div key={item.id} className="flex items-center gap-3 my-4">
                                        <div className="flex-1 h-px bg-gray-200" />
                                        <span className="text-xs text-gray-400 font-medium px-2 whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <div className="flex-1 h-px bg-gray-200" />
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
                                                    ? "bg-blue-500 text-white rounded-br-md"
                                                    : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                        <div className={`flex items-center gap-1 mt-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                            <span className="text-[10px] text-gray-400">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                            {isMe && (
                                                msg.seen
                                                    ? <BsCheckAll className="text-blue-500 text-xs" />
                                                    : <BsCheck className="text-gray-400 text-xs" />
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
                        <div className="px-5 pb-1 text-xs italic text-gray-400 shrink-0">
                            Typing...
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center gap-2 shrink-0">
                        <input
                            value={text}
                            onChange={handleTyping}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!text.trim()}
                            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center transition-all shrink-0"
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