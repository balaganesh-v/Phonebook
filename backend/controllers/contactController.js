import {
    createNewContact,
    getUserContacts,
    getUserContactById,
    updateUserContact,
    deleteUserContact
} from "../services/contactService.js";

export const createContact = async (req, res) => {
    try {
        const contact = await createNewContact(req.body, req.user);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getUserContacts(req.user);
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await getUserContactById(req.params.id, req.user);
        if (!contact){
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await updateUserContact(
            req.params.id,
            req.body,
            req.user
        );
        if (!contact){
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await deleteUserContact(req.params.id, req.user);
        if (!contact){
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
