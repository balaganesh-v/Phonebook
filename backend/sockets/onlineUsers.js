// sockets/onlineUsers.js
const onlineUsers = new Map(); // userId -> socketId

export const addOnlineUser = (userId, socketId) => {
    onlineUsers.set(userId, socketId);
};

export const removeOnlineUser = (socketId) => {
    for (const [userId, id] of onlineUsers.entries()) {
        if (id === socketId) {
            onlineUsers.delete(userId);
            return userId;
        }
    }
};

export const getSocketIdByUser = (userId) => {
    return onlineUsers.get(userId);
};

export const getOnlineUsers = () => {
    return Array.from(onlineUsers.keys());
};
