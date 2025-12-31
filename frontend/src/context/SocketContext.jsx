import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket.js";

const SocketContext = createContext(null);

export const SocketProvider = ({ userId, children }) => {
    const [me, setMe] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!userId) return;

        socket.on("me", (data) => setMe(data));
        socket.on("online-users", (users) => setOnlineUsers(users));

        socket.emit("register", userId);

        return () => {
            socket.off("me");
            socket.off("online-users");
        };
    }, [userId]);

    const joinConversation = (conversationId) => {
        if (!conversationId) return;
        socket.emit("join-conversation", conversationId);
    };

    const sendSocketMessage = ({ conversationId, receiverId, content }) => {
        if (!content?.trim()) return;

        socket.emit("send-message", {
            conversationId,
            receiverId,
            content
        });
    };


    return (
        <SocketContext.Provider
            value={{ socket, me, onlineUsers, joinConversation, sendSocketMessage }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
