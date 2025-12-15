// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String,  unique: true, lowercase: true },
    address: { type: String, default: '' },
    company: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    birthday: { type: Date },
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
