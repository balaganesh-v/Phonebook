import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const conversationSchema = new mongoose.Schema(
    {
        participants: {
            type: [participantSchema],
            required: true,
            validate: {
                validator: (v) => Array.isArray(v) && v.length >= 2,
                message: "A conversation must have at least 2 participants",
            },
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages",
            default: null,
        },
        contactNames: {
            type: Map,
            of: String,
            default: {},
        },
    },
    { timestamps: true, versionKey: false }
);

// Fast lookup by participant
conversationSchema.index({ "participants.userId": 1 });

export default mongoose.model("Conversations", conversationSchema);