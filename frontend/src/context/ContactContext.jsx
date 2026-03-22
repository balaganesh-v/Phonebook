import {
    createContext,
    useEffect,
    useState,
    useMemo
} from "react";

import {
    createContact,
    getContacts,
    updateContactById,
    deleteContactById,
} from "../services/contactService.js"

import {
    addContactFavourite as addFavouriteApi,
    removeContactFavourite as removeFavouriteApi
} from "../services/favouriteService.js"

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
            setEditingContact(null);
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

    const addContactAsFavourite = async (id) => {
        try {
            setLoading(true);
            await addFavouriteApi(id);       // POST /favourite/:id
            await initializeContacts();
        } catch (err) {
            setError("Failed to add contact as favourite");
        } finally {
            setLoading(false);
        }
    };

    const removeContactAsFavourite = async (id) => {
        try {
            setLoading(true);
            await removeFavouriteApi(id);    // DELETE /favourite/:id
            await initializeContacts();
        } catch (err) {
            setError("Failed to remove contact as favourite");
        } finally {
            setLoading(false);
        }
    };

    const value = useMemo(() => ({
        contacts,
        searchQuery,
        setSearchQuery,
        addContact,
        updateContact,
        deleteContact,
        editingContact,
        setEditingContact,
        addContactAsFavourite,
        removeContactAsFavourite,
        loading,
        error,
    }), [contacts, searchQuery, editingContact, loading, error]);

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
};