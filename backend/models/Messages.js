import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversations",
            required: true,
            index: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        messageType: {
            type: String,
            enum: ["text", "image", "file", "audio"],
            default: "text",
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "seen"],
            default: "sent",
        },
        readAt: {
            type: Date,
            default: null,
        },
        deletedFor: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Users",
            default: [],
        },
    },
    { timestamps: true, versionKey: false }
);

// Fast message loading for a conversation, newest first
messageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model("Messages", messageSchema);