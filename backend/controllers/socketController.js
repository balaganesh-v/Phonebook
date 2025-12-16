import Call from "../models/Call.js";

const onlineUsers = new Map();

/**
 * Register a user as online
 */
export const registerUser = (socket, contactId) => {
    if (!contactId) return;
    onlineUsers.set(String(contactId), socket.id);
};

/**
 * Create a call (caller optional, receiver required)
 */
export const callUser = async (io, data) => {
    try {
        const { callerId, receiverId, callType } = data;

        if (!receiverId || !callType) {
            console.error("Missing receiverId or callType");
            return;
        }

        // Persist call (caller optional)
        const call = await Call.create({
            caller: callerId || null,
            receiver: receiverId,
            callType,
            status: "ringing"
        });

        console.log("Call stored:", call._id.toString());

        // Notify receiver if online
        const receiverSocketId = onlineUsers.get(String(receiverId));
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incoming-call", {
                callId: call._id,
                callerId: callerId || null,
                callType
            });
        }
    } catch (error) {
        console.error("callUser error:", error.message);
    }
};

/**
 * Answer a call
 */
export const answerCall = async ({ callId }) => {
    if (!callId) return;

    await Call.findByIdAndUpdate(callId, {
        status: "answered"
    });
};

/**
 * End a call
 */
export const endCall = async ({ callId }) => {
    if (!callId) return;

    await Call.findByIdAndUpdate(callId, {
        status: "ended",
        endedAt: new Date()
    });
};

/**
 * Remove disconnected user
 */
export const removeUser = (socketId) => {
    for (const [contactId, sId] of onlineUsers.entries()) {
        if (sId === socketId) {
            onlineUsers.delete(contactId);
            break;
        }
    }
};
