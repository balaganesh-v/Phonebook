import { useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const { filteredContacts, initializeContacts } = useContacts();

    // Load contacts on component mount
    useEffect(() => {
        initializeContacts();
    }, []);

    if (!filteredContacts || filteredContacts.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No contacts found</p>;
    }

    return (
        <div className="space-y-2 mt-8">
            {filteredContacts.map(contact => (
                <ContactCard key={contact._id} contact={contact} />
            ))}
        </div>
    );
};

export default ContactList;
