import Contact from "../models/Contact.js";

export const createContact = (data) => {
    return Contact.create(data);
};

export const getAllContacts = () => {
    return Contact.find().sort({ createdAt: -1 });
};

export const getContactById = (id) => {
    return Contact.findById(id);
};

export const updateContact = (id, data) => {
    return Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

export const deleteContact = (id) => {
    return Contact.findByIdAndDelete(id);
};
