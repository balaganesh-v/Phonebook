import { useEffect } from "react";
import { useContacts } from "../../../context/ContactContext.jsx";
import ContactCard from "../ContactCard/ContactCard.jsx";

const ContactList = () => {
    const { contacts,loading } = useContacts();

    if (loading) {
        return (
            <p className="text-center text-gray-400 mt-6">
                Loading contacts...
            </p>
        );
    }

    if (contacts.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-6">
                No contacts found
            </p>
        );
    }

    return (
        <div className="space-y-3 mt-8">
            {contacts.map((contact) => (
                <ContactCard
                    key={contact._id || contact.id}
                    contact={contact}
                />
            ))}
        </div>
    );
};

export default ContactList;
