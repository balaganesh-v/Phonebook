import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket.js";
import { useAuth } from "../hooks/useAuth.js";

import {
    getConversations,
    getMessages,
    startConversation
} from "../services/messageService";

export const MessagesContext = createContext(); // ← added export

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

        // ✅ Fixed — use userId to match your schema
        const receiverId = activeConversation.participants.find(
            p => String(p.userId) !== String(user.id)
        )?.userId;

        sendSocketMessage({
            conversationId: activeConversation._id,
            receiverId,
            content: text
        });
    };

    const openChatWithContact = async (contact) => {
        if (!contact?._id) {
            throw new Error("Contact ID is missing");
        }

        if (!user?.id) {
            throw new Error("User ID is missing");
        }

        try {
            let convo = conversations.find(c =>
                c.participants.some(p => p.phone === contact.phone)
            );

            if (!convo) {
                convo = await startConversation(contact.phone, contact.name);
                setConversations(prev => [...prev, convo]);
            }

            setActiveConversation(convo);
            return convo;
        } catch (error) {
            console.error("Error in openChatWithContact:", error);
            throw error;
        }
    };

    return (
        <MessagesContext.Provider
            value={{
                conversations,
                activeConversation,
                setActiveConversation,
                openChatWithContact,
                messages,
                sendMessage,
                typingUser
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};