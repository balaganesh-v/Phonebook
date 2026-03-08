import { useState } from "react";
import { RiContactsBookFill } from "react-icons/ri";

import ContactList from "./list/ContactList.jsx"
import AddContactModal from "./modal/AddContactModal.jsx";
import EditContactModal from "./modal/EditContactModal.jsx";

import { useContacts } from "../../hooks/useContacts.js";

const ContactsPage = () => {
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
                <div className="flex items-center gap-2 px-4">
                    <RiContactsBookFill className="text-red-300 text-3xl" />
                    <h1 className="text-2xl font-semibold">Contacts</h1>
                </div>
                <button
                    onClick={() => setOpenAddContact(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
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

export default ContactsPage;