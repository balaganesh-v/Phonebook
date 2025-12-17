// models/Call.js
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
    user: {                                  // 👈 owner of the call
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    callId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },

    caller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        required: true,
        index: true
    },

    callType: {
        type: String,
        enum: ["audio", "video", "voice"],
        required: true
    },

    status: {
        type: String,
        enum: ["ringing", "answered", "rejected", "ended"],
        default: "ringing"
    },

    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null },
    duration: { type: Number, default: 0 }   // seconds
}, { timestamps: true, versionKey: false });

const Call = mongoose.model("Call", callSchema);
export default Call;
