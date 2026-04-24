import { useContacts } from "../../../../hooks/useContacts.js";
import ContactCard from "../card/ContactCard.jsx";

const ContactList = ({ onEdit, searchQuery }) => {
    const { contacts, loading } = useContacts();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-zinc-500 text-sm tracking-wide">
                    Loading contacts...
                </p>
            </div>
        );
    }

    // Search Filter
    const filtered = contacts.filter((contact) => {
        const query = searchQuery?.toLowerCase().trim() || "";

        if (!query) return true;

        return (
            contact.name?.toLowerCase().includes(query) ||
            contact.phone?.toLowerCase().includes(query)
        );
    });

    // No Contacts
    if (!contacts.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-black border border-amber-500/10 flex items-center justify-center text-3xl mb-4">
                    📒
                </div>

                <h3 className="text-white text-xl [font-family:'Pacifico',cursive] mb-2">
                    No Contacts Yet
                </h3>

                <p className="text-zinc-500 text-sm">
                    Add your first contact to get started.
                </p>
            </div>
        );
    }

    // No Search Results
    if (filtered.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-black border border-amber-500/10 flex items-center justify-center text-3xl mb-4">
                    🔍
                </div>

                <h3 className="text-white text-xl [font-family:'Pacifico',cursive] mb-2">
                    No Results Found
                </h3>

                <p className="text-zinc-500 text-sm">
                    No contact matches "{searchQuery}"
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filtered.map((contact) => (
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