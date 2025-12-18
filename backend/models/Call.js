import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const callSchema = new mongoose.Schema(
{
    callId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },

    user: {                            // call owner (caller)
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    caller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    callType: {
        type: String,
        enum: ["audio", "video"],
        required: true
    },

    status: {
        type: String,
        enum: ["ringing", "answered", "rejected", "ended"],
        default: "ringing"
    },

    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null },
    duration: { type: Number, default: 0 }

},
{ timestamps: true, versionKey: false }
);

export default mongoose.model("Call", callSchema);
