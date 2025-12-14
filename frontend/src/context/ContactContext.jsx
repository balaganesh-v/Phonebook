import { createContext, useState, useMemo, useContext } from "react";
import {
    createContact,
    getContacts,
    updateContactById,
    deleteContactById,
} from "../services/contactService";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const initializeContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error initializing contacts:", error);
        }
    };

    const addContact = async (data) => {
        try {
            await createContact(data);
            initializeContacts();
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const updateContact = async (id, data) => {
        try {
            await updateContactById(id, data);
            setEditingContact(null);
            initializeContacts();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await deleteContactById(id);
            initializeContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const filteredContacts = useMemo(() => {
        if (!searchQuery) return contacts;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [contacts, searchQuery]);

    return (
        <ContactContext.Provider
            value={{
                contacts,
                filteredContacts,
                searchQuery,
                setSearchQuery,
                addContact,
                updateContact,
                deleteContact,
                editingContact,
                setEditingContact,
                initializeContacts,
            }}
        >
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
