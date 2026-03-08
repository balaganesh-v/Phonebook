import { io } from "socket.io-client";

//Create ONE socket (reuse it during reloads)
const SOCKET_URL = "http://localhost:5001";

// Reuse socket if already created (prevents duplicates in dev)
if (!window.__APP_SOCKET__) {
    window.__APP_SOCKET__ = io(SOCKET_URL, {
        withCredentials: true,
        autoConnect: false,
        transports: ["websocket"],
    });
}

export const socket = window.__APP_SOCKET__;

//connect socket
export const connectSocket = () => {
    if (!socket.connected) {
        socket.connect();
        console.log("🔌 Connecting socket...");
    }
};

//Disconnect socket
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
        console.log("🔌 Disconnecting socket...");
    }
};


//If ID is available then show it
socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
});

//If ID is not available then disconnects the socket
socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
});

//If ID is not available then show error
socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
});
