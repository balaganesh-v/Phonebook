import * as contactService from "../services/contactService.js";

export const createContact = async (req, res) => {
    try {
        const contact = await contactService.createContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await contactService.getContactById(req.params.id);
        res.json(contact);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await contactService.updateContact(req.params.id, req.body);
        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        await contactService.deleteContact(req.params.id);
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
