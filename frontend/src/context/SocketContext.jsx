import { createContext, useContext, useEffect, useState } from "react";
import { socket } from  "../socket.js"

const SocketContext = createContext(null);

export const SocketProvider = ({ userId, children }) => {
    const [me, setMe] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!userId) return;

        // Receive self info
        socket.on("me", (data) => {
            setMe(data);
        });

        // Receive online users list
        socket.on("online-users", (users) => {
            setOnlineUsers(users);
        });

        // Register user
        socket.emit("register", userId);

        return () => {
            socket.off("me");
            socket.off("online-users");
        };
    }, [userId]);

    return (
        <SocketContext.Provider value={{ socket, me, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used inside SocketProvider");
    }
    return context;
};
