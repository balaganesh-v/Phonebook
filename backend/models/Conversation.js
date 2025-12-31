// models/Conversation.js
import mongoose from "mongoose";

/**
 * Each participant stores a snapshot of user info
 * so chat UI does NOT depend on populate every time
 */
const participantSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String
        }
    },
    { _id: false } // prevent extra subdocument _id
);

const conversationSchema = new mongoose.Schema(
    {
        participants: {
            type: [participantSchema],
            required: true,
            validate: {
                validator: (v) => Array.isArray(v) && v.length >= 2,
                message: "A conversation must have at least 2 participants"
            }
        },

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// 🔍 Fast lookup by participant user id
conversationSchema.index({ "participants._id": 1 });

export default mongoose.model("Conversation", conversationSchema);
