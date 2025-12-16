import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
    {
        caller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            default: null   // caller is optional
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: true,
            index: true     // frequent lookup by receiver
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
        startedAt: {
            type: Date,
            default: Date.now
        },
        endedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Call", callSchema);
