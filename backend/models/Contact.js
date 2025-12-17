const contactSchema = new mongoose.Schema({
    user: {                                   // owner of contact
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    linkedUser: {                             // 👈 if this contact is a registered user
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

}, { timestamps: true, versionKey: false });
