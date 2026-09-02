import Contacts from "../models/Contacts.js";
import mongoose from "mongoose";
import Favourites from "../models/Favourites.js";

//Creates the Contact
export const createContact = (data) =>
    Contacts.create(data);

//Get the Contact By User
export const getContactsByUser = (userId) =>
    Contacts.find({ user: userId }).sort({ createdAt: -1 });

// Get a contact by User ID for a specific user
export const getContactById = (id, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return null;
    return Contacts.findOne({ _id: id, user: userId });
};

// Update a contact by UserID for a specific user
export const updateContactById = (id, userId, data) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return null;
    return Contacts.findOneAndUpdate({ _id: id, user: userId }, data, { returnDocument: 'after' });
};

// Delete a contact by User ID for a specific user
export const deleteContactById = (id, userId) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        return null;
    return Contacts.findOneAndDelete({ _id: id, user: userId });
};

/* ✅ NEW: check duplicate phone per user */
export const findByPhoneAndUser = (phone, userId) =>
    Contacts.findOne({ phone, user: userId });


