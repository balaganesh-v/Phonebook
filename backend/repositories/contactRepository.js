import Contact from "../models/Contact.js";

export const createContact = (data) => Contact.create(data);

export const getContactsByUser = (userId) =>
    Contact.find({ user: userId }).sort({ createdAt: -1 });

export const getContactById = (id, userId) =>
    Contact.findOne({ _id: id, user: userId });

export const updateContactById = (id, userId, data) =>
    Contact.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });

export const deleteContactById = (id, userId) =>
    Contact.findOneAndDelete({ _id: id, user: userId });

/* ✅ NEW: check duplicate phone per user */
export const findByPhoneAndUser = (phone, userId) =>
    Contact.findOne({ phone, user: userId });
