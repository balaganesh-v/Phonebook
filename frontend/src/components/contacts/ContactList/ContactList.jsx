import { useContacts } from "../../../context/ContactContext";
import ContactCard from "../ContactCard/ContactCard";

const ContactList = ({ onEdit }) => {
    const { contacts, loading } = useContacts();

    if (loading) {
        return <p className="text-center mt-6">Loading contacts...</p>;
    }

    if (!contacts.length) {
        return <p className="text-center mt-6">No contacts found</p>;
    }

    return (
        <div className="space-y-3 mt-8">
            {contacts.map((contact) => (
                <ContactCard
                    key={contact._id || contact.id}
                    contact={contact}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default ContactList;
