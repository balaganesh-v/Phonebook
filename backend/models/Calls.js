import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const callSchema = new mongoose.Schema(
    {
        callId: {
            type: String,
            default: () => uuidv4(),
            unique: true,
        },
        caller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            index: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            index: true,
        },
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversations",
            default: null,
        },
        callType: {
            type: String,
            enum: ["audio", "video"],
            required: true,
        },
        status: {
            type: String,
            enum: ["ringing", "answered", "rejected", "ended", "missed"],
            default: "ringing",
        },
        startedAt: {
            type: Date,
            default: null,
        },
        endedAt: {
            type: Date,
            default: null,
        },
        duration: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

// Fast call history lookup per user
callSchema.index({ caller: 1, createdAt: -1 });
callSchema.index({ receiver: 1, createdAt: -1 });

export default mongoose.model("Call", callSchema);