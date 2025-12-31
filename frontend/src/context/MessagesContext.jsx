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

    /* Load conversations */
    useEffect(() => {
        getConversations().then(setConversations);
    }, []);

    /* Load messages + join socket room */
    useEffect(() => {
        if (!activeConversation) {
            setMessages([]);
            return;
        }

        joinConversation(activeConversation._id);
        getMessages(activeConversation._id).then(setMessages);
    }, [activeConversation]);

    /* Listen for new messages */
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg) => {
            setMessages(prev => [...prev, msg]);
        };

        socket.on("new-message", handleNewMessage);
        return () => socket.off("new-message", handleNewMessage);
    }, [socket]);

    /* Open chat with contact */
    const openChatWithContact = async (contact) => {
        const existing = conversations.find(conv =>
            conv.participants.some(p => p._id === contact._id)
        );

        if (existing) {
            setActiveConversation(existing);
            return;
        }

        const newConversation = await startConversation(contact._id);
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversation(newConversation);
    };

    /* SEND MESSAGE (🔥 FIXED) */
    const sendMessage = (text) => {
        if (!text.trim() || !activeConversation) return;

        const receiverId = activeConversation.participants.find(
            p => p._id !== user._id
        )?._id;

        if (!receiverId) {
            console.error("Receiver not found");
            return;
        }

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
                openChatWithContact
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => useContext(MessagesContext);
