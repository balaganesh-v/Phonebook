import Contact from "../models/Contact.js";

export const createContact = (data) => {
    return Contact.create(data);
};

export const getContactsByUser = (userId) => {
    return Contact.find({ user: userId }).sort({ createdAt: -1 });
};

export const getContactById = (id, userId) => {
    return Contact.findOne({ _id: id, user: userId });
};

export const updateContactById = (id, userId, data) => {
    return Contact.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
};

export const deleteContactById = (id, userId) => {
    return Contact.findOneAndDelete({ _id: id, user: userId });
};
