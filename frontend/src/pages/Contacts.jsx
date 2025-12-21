import { useState } from "react";
import ContactList from "../components/contacts/ContactList/ContactList";
import AddContactModal from "../components/contacts/Modal/AddContactModal";
import EditContactModal from "../components/contacts/Modal/EditContactModal";
import { useContacts } from "../context/ContactContext";

const Contacts = () => {
    const [openAddContact, setOpenAddContact] = useState(false);
    const [openEditContact, setOpenEditContact] = useState(false);

    const { setEditingContact } = useContacts();

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setOpenEditContact(true);
    };

    const handleCloseEdit = () => {
        setEditingContact(null);
        setOpenEditContact(false);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold px-4">Contacts</h1>
                <button onClick={() => setOpenAddContact(true) } className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                    + Add Contact
                </button>
            </div>

            <ContactList onEdit={handleEdit} />

            <AddContactModal
                open={openAddContact}
                onClose={() => setOpenAddContact(false)}
            />

            <EditContactModal
                open={openEditContact}
                onClose={handleCloseEdit}
            />
        </>
    );
};

export default Contacts;
