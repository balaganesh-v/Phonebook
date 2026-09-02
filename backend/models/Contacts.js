import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            index: true,
        },
        linkedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            default: null,
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
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        company: {
            type: String,
            trim: true,
            default: "",
        },
        jobTitle: {
            type: String,
            trim: true,
            default: "",
        },
        birthday: {
            type: Date,
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true, versionKey: false }
);

// Same user cannot save the same phone number twice
contactSchema.index({ user: 1, phone: 1 }, { unique: true });

export default mongoose.model("Contacts", contactSchema);