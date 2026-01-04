import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket.js";

const SocketContext = createContext(null);

export const SocketProvider = ({ userId, children }) => {
    const [me, setMe] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!userId) return;

        socket.on("me", setMe);
        socket.on("online-users", setOnlineUsers);

        socket.emit("register", userId);

        return () => {
            socket.off("me");
            socket.off("online-users");
        };
    }, [userId]);

    const joinConversation = (conversationId) => {
        if (conversationId) {
            socket.emit("join-conversation", conversationId);
        }
    };

    const sendSocketMessage = ({ conversationId, receiverId, content }) => {
        socket.emit("send-message", {
            conversationId,
            receiverId,
            content
        });
    };

    /* 🔹 NEW */
    const sendTypingStatus = ({ conversationId, isTyping }) => {
        socket.emit("typing", { conversationId, isTyping });
    };

    /* 🔹 NEW */
    const sendSeenStatus = ({ conversationId, messageId }) => {
        socket.emit("message-seen", { conversationId, messageId });
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                me,
                onlineUsers,
                joinConversation,
                sendSocketMessage,
                sendTypingStatus,
                sendSeenStatus
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
