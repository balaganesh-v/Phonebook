import { createContext, useContext, useEffect, useState } from "react";
import { socket, connectSocket, disconnectSocket } from "../socket.js"
import { useAuth } from "./AuthContext.jsx";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [me, setMe] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Connect/disconnect socket based on authentication status
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            connectSocket();

            socket.on("me", setMe);
            socket.on("online-users", setOnlineUsers);

            socket.emit("register", user.id);

            return () => {
                socket.off("me");
                socket.off("online-users");
            };
        } else {
            disconnectSocket();
        }
    }, [isAuthenticated, user?.id]);

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

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        return { socket: null, me: null, onlineUsers: [], joinConversation: null, sendSocketMessage: null, sendTypingStatus: null, sendSeenStatus: null };
    }
    return context;
};
