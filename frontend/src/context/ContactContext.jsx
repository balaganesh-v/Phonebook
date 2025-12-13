import { createContext, useEffect, useState } from "react";
import { createContact,getContacts,updateContactById,deleteContactById,} from "../services/contactService";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);

    const loadContacts = async () => {
        try{
            const data = await getContacts();
            setContacts(data);
        }catch(error){
            console.error("Error loading contacts:", error);
            throw error;
        }
        
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const addContact = async (data) => {
        try{
            await createContact(data);
            loadContacts();
        }catch(error){
            console.error("Error adding contact:", error);
            throw error;
        }
        
    };

    const updateContact = async (id, data) => {
        try{
            await updateContactById(id, data);
            setEditingContact(null);
            loadContacts();
        }catch(error){
            console.error("Error updating contact:", error);
            throw error;
        }
        
    };

    const deleteContact = async (id) => {
        try{
            await deleteContactById(id);
            loadContacts();
        }catch(error){
            console.error("Error deleting contact:", error);
            throw error;
        }
    };

    return (
        <ContactContext.Provider
            value={{
                contacts,
                addContact,
                updateContact,
                deleteContact,
                editingContact,
                setEditingContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};


// createContext()
// → Creates a shared box

// Provider
// → Puts data into the box

// value={{  }}
// → Actual data inside the box

// useContext()
// → Takes data from the box