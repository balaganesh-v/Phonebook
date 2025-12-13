import { useContacts } from "../hooks/useContacts";
import  ContactCard  from "./ContactCard";

const ContactList = () => {
    const { contacts } = useContacts();

    if (!contacts.length)
        return <p className="text-center text-gray-200">No contacts found</p>;

    return (
        <div className="grid gap-4">
            {contacts.map((c) => (
                <ContactCard key={c._id} contact={c} />
            ))}
        </div>
    );
};

export default ContactList;
