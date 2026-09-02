import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            unique: true,        // ✅ one document per user
            index: true,
        },
        contactIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Contacts",
                default: [],
            },
        ],
        conversationIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Conversations",
                default: [],
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Favourites", favouriteSchema);