import { useState } from "react";
import ContactList from "../components/contacts/ContactList/ContactList";
import AddContactModal from "../components/contacts/Modal/addContactModal";

const Contacts = () => {
    const [openAdd, setOpenAdd] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Contacts</h1>
                <button
                    onClick={() => setOpenAdd(true)}
                    className="bg-blue-600 text-white rounded-xl px-4 py-2 rounded"
                >
                    + Add Contact
                </button>
            </div>

            <ContactList />

            <AddContactModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
            />
        </>
    );
};

export default Contacts;
