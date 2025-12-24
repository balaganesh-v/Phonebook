import Call from "../models/Call.js";
import { onlineUsers } from "../sockets/onlineUsers.js";

const activeCalls = new Map();
/*
    key   → userId
    value → connected userId
*/

// ** HANDLE CALL USER **
export const handleCallUser = async (io, data) => {
    const { from, to, callType } = data;

    if (!from || !to || from === to) return;

    const callerSocketId = onlineUsers.get(from);
    const receiverSocketId = onlineUsers.get(to);

    // 🔴 Receiver offline → reject
    if (!receiverSocketId) {
        if (callerSocketId) {
            io.to(callerSocketId).emit("call-rejected", {
                reason: "User is offline"
            });
        }

        // Save rejected call
        await Call.create({
            user: from,
            caller: from,
            receiver: to,
            callType,
            status: "rejected",
            endedAt: new Date()
        });

        return;
    }

    // 🔴 User busy
    if (activeCalls.has(from) || activeCalls.has(to)) {
        io.to(callerSocketId).emit("call-rejected", {
            reason: "User is busy"
        });
        return;
    }

    // Create call record
    const call = await Call.create({
        user: from,
        caller: from,
        receiver: to,
        callType,
        status: "ringing"
    });

    activeCalls.set(from, to);
    activeCalls.set(to, from);

    // Send callId to frontend
    io.to(receiverSocketId).emit("incoming-call", {
        ...data,
        callId: call.callId
    });
};

//Answer Call
export const handleAnswerCall = async (io, data) => {
    const { callId, from, to } = data;

    // Verify active call
    if (activeCalls.get(from) !== to) return;

    await Call.findOneAndUpdate(
        { callId },
        { status: "answered", startedAt: new Date() }
    );

    const callerSocketId = onlineUsers.get(to);
    if (callerSocketId) {
        io.to(callerSocketId).emit("call-answered", data);
    }
};

// End Call or Reject Call
export const handleEndCall = async (io, data) => {
    const { callId, from, to } = data;

    const call = await Call.findOne({ callId });
    if (!call) return;

    const endedAt = new Date();
    const duration = call.startedAt
        ? Math.floor((endedAt - call.startedAt) / 1000)
        : 0;

    await Call.updateOne(
        { callId },
        {
            status: "ended",
            endedAt,
            duration
        }
    );

    activeCalls.delete(from);
    activeCalls.delete(to);

    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("call-ended");
    }
};
