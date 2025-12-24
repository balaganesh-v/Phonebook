import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import messageService from "../services/messageService";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const { socket } = useSocket();

    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    // Load conversation list
    useEffect(() => {
        messageService.getConversations().then(setConversations);
    }, []);

    // Load messages + join socket room
    useEffect(() => {
        if (!activeConversation) return;

        socket.emit("join-conversation", activeConversation._id);

        messageService
            .getMessages(activeConversation._id)
            .then(setMessages);
    }, [activeConversation]);

    // Socket listeners
    useEffect(() => {
        socket.on("new-message", msg => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.off("new-message");
    }, []);

    const sendMessage = (text) => {
        socket.emit("send-message", {
            conversationId: activeConversation._id,
            text,
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
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => useContext(MessagesContext);
