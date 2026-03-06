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
        getConversations()
            .then(setConversations)
            .catch((err) => console.error("Failed to load conversations:", err));
    }, []);

    useEffect(() => {
        if (!activeConversation) {
            setMessages([]);
            return;
        }

        if (joinConversation) joinConversation(activeConversation._id);
        getMessages(activeConversation._id)
            .then(setMessages)
            .catch((err) => console.error("Failed to load messages:", err));
    }, [activeConversation]);

    /* 🔹 NEW MESSAGE */
    useEffect(() => {
        if (!socket) return;
        socket.on("new-message", (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.off("new-message");
    }, [socket]);

    /* 🔹 TYPING */
    useEffect(() => {
        if (!socket) return;
        socket.on("typing", ({ userId, isTyping }) => {
            setTypingUser(isTyping ? userId : null);
        });

        return () => socket.off("typing");
    }, [socket]);

    /* 🔹 MESSAGE SEEN */
    useEffect(() => {
        if (!socket) return;
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
            p => p._id !== user.id
        )?._id;

        if (sendSocketMessage) {
            sendSocketMessage({
                conversationId: activeConversation._id,
                receiverId,
                content: text
            });
        }
    };
    const openChatWithContact = async (contact) => {
        if (!contact?._id) {
            throw new Error("Contact ID is missing");
        }

        if (!user?.id) {
            throw new Error("User ID is missing");
        }

        try {
            // 1. Check existing conversation
            let convo = conversations.find(c =>
                c.participants.some(p => p.phone === contact.phone)
            );

            // 2. Create if not exists
            if (!convo) {
                convo = await startConversation(contact.phone, contact.name);
                setConversations(prev => [...prev, convo]);
            }

            // 3. Activate
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

export const useMessages = () => useContext(MessagesContext);
