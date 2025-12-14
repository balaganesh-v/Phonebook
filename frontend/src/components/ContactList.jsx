import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const { filteredContacts } = useContacts();

    if (!filteredContacts || filteredContacts.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-4">
                No contacts found
            </p>
        );
    }

    return (
        <div className="space-y-2">
            {filteredContacts.map((contact) => (
                <ContactCard
                    key={contact._id}
                    contact={contact}
                />
            ))}
        </div>
    );
};

export default ContactList;
