import * as contactRepository from "../repositories/contactRepository.js";

export const createContact = async (data) => {
    if (!data.name || !data.phone) {
        throw new Error("Name and phone are required");
    }
    return await contactRepository.createContact(data);
};

export const getAllContacts = async () => {
    return await contactRepository.getAllContacts();
};

export const getContactById = async (id) => {
    const contact = await contactRepository.getContactById(id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    return contact;
};

export const updateContact = async (id, data) => {
    const updated = await contactRepository.updateContact(id, data);
    if (!updated) {
        throw new Error("Contact not found");
    }
    return updated;
};

export const deleteContact = async (id) => {
    const deleted = await contactRepository.deleteContact(id);
    if (!deleted) {
        throw new Error("Contact not found");
    }
    return deleted;
};
