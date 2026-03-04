// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true // ✅ ENFORCED
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        messageType: {
            type: String,
            enum: ["text", "image", "file"],
            default: "text"
        },

        status: {
            type: String,
            enum: ["sent", "delivered", "seen"],
            default: "sent"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

//Index for fast conversation message retrieval
messageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);
