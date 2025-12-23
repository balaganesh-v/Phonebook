// models/Conversation.js
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        }
    },
    { timestamps: true, versionKey: false }
);

conversationSchema.index({ participants: 1 });

export default mongoose.model("Conversation", conversationSchema);
