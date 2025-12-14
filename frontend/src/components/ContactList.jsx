import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const { contacts } = useContacts();

    return (
        <div className="w-full max-w-2xl mx-auto px-2 space-y-4">
            {contacts.length === 0 ? (
                <p className="text-center text-gray-500">No contacts yet.</p>
            ) : (
                contacts.map((contact) => (
                    <ContactCard key={contact._id} contact={contact} />
                ))
            )}
        </div>
    );
};

export default ContactList;
