import Call from "../models/Call.js";
import User from "../models/User.js"; // optional, for recent calls

// Map to track online users
export const onlineUsers = new Map();

// Register a user as online
export const registerUser = (socket, contactId) => {
    if (!contactId){
        throw new Error("contactId is required");
    }
    onlineUsers.set(String(contactId), socket.id);
    console.log(`User registered: ${contactId} -> SocketID: ${socket.id}`);
};

// Create a call
export const callUser = async (io, data) => {
    try {
        const { callerId, receiverId, callType, offerSDP } = data;

        if ( !receiverId ) {
            console.error("Did not receive receiverId for callUser");
            return;
        }

        // Save call to DB
        const call = await Call.create({
            caller: callerId,
            receiver: receiverId,
            callType,
            status: "ringing",
            createdAt: new Date()
        });
        console.log("Call stored:", call._id.toString());

        // Notify receiver if online
        const receiverSocketId = onlineUsers.get(String(receiverId));
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incoming-call", {
                callId: call._id,
                callerId: callerId || null,
                callType,
                offerSDP
            });
        }
    } catch (error) {
        console.error("callUser error:", error.message);
    }
};

// Answer a call
export const answerCall = async ({ callId }) => {
    if (!callId){
        throw new Error("callId is required");
    }
    await Call.findByIdAndUpdate(callId, { status: "answered" });
    console.log("Call answered:", callId);
};

// End a call
export const endCall = async ({ callId }) => {
    if (!callId){
        throw new Error("callId is required");
    }
    await Call.findByIdAndUpdate(callId, { status: "ended", endedAt: new Date() });
    console.log("Call ended:", callId);
};

// Remove disconnected user
export const removeUser = (socketId) => {
    for (const [contactId, sId] of onlineUsers.entries()) {
        if (sId === socketId) {
            onlineUsers.delete(contactId);
            console.log(`User removed: ${contactId}`);
            break;
        }
    }
};
