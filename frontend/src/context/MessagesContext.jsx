import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import {
    getConversations,
    getMessages,
    startConversation
} from "../services/messageService";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const { socket, joinConversation, sendSocketMessage } = useSocket();
    const { user } = useAuth();

    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState(null);

    useEffect(() => {
        getConversations().then(setConversations);
    }, []);

    useEffect(() => {
        if (!activeConversation) {
            setMessages([]);
            return;
        }

        joinConversation(activeConversation._id);
        getMessages(activeConversation._id).then(setMessages);
    }, [activeConversation]);

    /* 🔹 NEW MESSAGE */
    useEffect(() => {
        socket.on("new-message", (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.off("new-message");
    }, [socket]);

    /* 🔹 TYPING */
    useEffect(() => {
        socket.on("typing", ({ userId, isTyping }) => {
            setTypingUser(isTyping ? userId : null);
        });

        return () => socket.off("typing");
    }, [socket]);

    /* 🔹 MESSAGE SEEN */
    useEffect(() => {
        socket.on("message-seen", (updatedMessage) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg._id === updatedMessage._id ? updatedMessage : msg
                )
            );
        });

        return () => socket.off("message-seen");
    }, [socket]);

    const sendMessage = (text) => {
        if (!text.trim() || !activeConversation) return;

        const receiverId = activeConversation.participants.find(
            p => p._id !== user._id
        )?._id;

        sendSocketMessage({
            conversationId: activeConversation._id,
            receiverId,
            content: text
        });
    };

    return (
        <MessagesContext.Provider
            value={{
                conversations,
                activeConversation,
                setActiveConversation,
                messages,
                sendMessage,
                typingUser
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => useContext(MessagesContext);
