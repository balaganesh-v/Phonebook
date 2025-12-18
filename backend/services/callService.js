import * as callRepo from "../repositories/callRepository.js";

// Create call
export const startCall = async ({ callerId, receiverId, callType }) => {
    return callRepo.createCall({
        user: callerId,
        caller: callerId,
        receiver: receiverId,
        callType
    });
};

// Answer call
export const answerCall = async (callId) => {
    return callRepo.updateCall(callId, { status: "answered" });
};

// End call
export const endCall = async (callId) => {
    return callRepo.updateCall(callId, {
        status: "ended",
        endedAt: new Date()
    });
};
