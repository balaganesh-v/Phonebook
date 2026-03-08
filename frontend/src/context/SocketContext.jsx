import { createContext, useEffect, useState } from "react";
import { socket, connectSocket, disconnectSocket } from "../socket.js"
import { useAuth } from "../hooks/useAuth.js";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    //Auth
    const { user, isAuthenticated } = useAuth();

    //Socket
    const [me, setMe] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

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

    const sendTypingStatus = ({ conversationId, isTyping }) => {
        socket.emit("typing", { conversationId, isTyping });
    };

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