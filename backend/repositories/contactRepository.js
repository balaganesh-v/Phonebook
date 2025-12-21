import Contact from "../models/Contact.js";
import mongoose from "mongoose";

export const createContact = (data) => Contact.create(data);

export const getContactsByUser = (userId) =>
    Contact.find({ user: userId }).sort({ createdAt: -1 });

// Get a contact by ID for a specific user
export const getContactById = (id, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Contact.findOne({ _id: id, user: userId });
};

// Update a contact by ID for a specific user
export const updateContactById = (id, userId, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Contact.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
};

// Delete a contact by ID for a specific user
export const deleteContactById = (id, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Contact.findOneAndDelete({ _id: id, user: userId });
};

/* ✅ NEW: check duplicate phone per user */
export const findByPhoneAndUser = (phone, userId) =>
    Contact.findOne({ phone, user: userId });
