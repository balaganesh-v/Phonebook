import Call from "../models/Call.js";

export const createCall = (data) => {
    return Call.create(data);
};

export const updateCall = (callId, data) => {
    return Call.findByIdAndUpdate(callId, data, { new: true });
};

export const findCallById = (callId) => {
    return Call.findById(callId);
};

export const findUserCalls = (userId) => {
    return Call.find({
        $or: [{ caller: userId }, { receiver: userId }]
    });
};

export default {
    createCall,
    updateCall,
    findCallById,
    findUserCalls
};
