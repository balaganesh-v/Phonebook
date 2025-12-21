import { createContext, useContext, useState, useEffect } from "react";
import {
    createContact,
    getContacts,
    updateContactById,
    deleteContactById,
} from "../services/contactService";

export const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initializeContacts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getContacts();
            console.log(data)
            setContacts(data || []);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setError("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeContacts();
    }, []);

    const addContact = async (data) => {
        try {
            setLoading(true);
            setError(null);
            await createContact(data);
            await initializeContacts();
        } catch (err) {
            console.error("Error creating contact:", err);
            setError("Failed to create contact");
        } finally {
            setLoading(false);
        }
    };

    const updateContact = async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            await updateContactById(id, data);
            setEditingContact(null);
            await initializeContacts();
        } catch (err) {
            console.error("Error updating contact:", err);
            setError("Failed to update contact");
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteContactById(id);
            await initializeContacts();
        } catch (err) {
            console.error("Error deleting contact:", err);
            setError("Failed to delete contact");
        } finally {
            setLoading(false);
        }
    };

    const value = {
        contacts,
        searchQuery,
        setSearchQuery,
        addContact,
        updateContact,
        deleteContact,
        editingContact,
        setEditingContact,
        initializeContacts,
        loading,
        error,
    };

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContacts must be used within a ContactProvider");
    }
    return context;
};
