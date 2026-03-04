import { createContext, useContext, useEffect, useState } from "react";
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
            await createContact(data);
            await initializeContacts();
        } catch (err) {
            setError("Failed to create contact");
        } finally {
            setLoading(false);
        }
    };

    const updateContact = async (id, data) => {
        try {
            setLoading(true);
            await updateContactById(id, data);
            setEditingContact(null); // CLOSE MODAL
            await initializeContacts();
        } catch (err) {
            setError("Failed to update contact");
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (id) => {
        try {
            setLoading(true);
            await deleteContactById(id);
            await initializeContacts();
        } catch (err) {
            setError("Failed to delete contact");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContactContext.Provider
            value={{
                contacts,
                searchQuery,
                setSearchQuery,
                addContact,
                updateContact,
                deleteContact,
                editingContact,
                setEditingContact,
                loading,
                error,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContacts must be used within ContactProvider");
    }
    return context;
};
