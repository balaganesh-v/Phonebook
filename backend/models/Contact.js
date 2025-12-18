import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
    // Owner of this contact (logged-in user)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    // If this contact is also a registered user
    linkedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true },
    address: { type: String, default: "" },
    company: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    birthday: { type: Date },
    notes: { type: String, default: "" }

},
{ timestamps: true, versionKey: false }
);

export default mongoose.model("Contact", contactSchema);
