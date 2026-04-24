import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { MdContacts } from "react-icons/md";

import ContactList from "./list/ContactList.jsx";
import AddContactModal from "./modal/AddContactModal.jsx";
import EditContactModal from "./modal/EditContactModal.jsx";

import { useContacts } from "../../../hooks/useContacts.js";

const ContactsPage = () => {
    const [openAddContact, setOpenAddContact] = useState(false);
    const [openEditContact, setOpenEditContact] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
        <section className="w-full bg-black text-white px-6 py-5 overflow-y-auto min-h-[calc(100vh-140px)]">

            {/* Same Width as Navbar/Footer */}
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <MdContacts className="text-amber-300 text-2xl" />
                        <h1 className="text-2xl text-white [font-family:'Pacifico',cursive]">
                            Contacts
                        </h1>
                    </div>
                    <button
                        onClick={() => setOpenAddContact(true)}
                        className="px-4 py-2 rounded-2xl text-sm font-semibold text-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.18)]"
                    >
                        + Add Contact
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-base" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or phone..."
                        className="w-full h-14 rounded-2xl bg-zinc-950 border border-white/5 focus:border-amber-400/30 text-white text-sm pl-11 pr-10 outline-none placeholder:text-zinc-500 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                        >
                            <FiX size={16} />
                        </button>
                    )}
                </div>

                {/* Contact List */}
                <div className="rounded-3xl border border-white/5 bg-zinc-950 p-4 min-h-[420px]">
                    <ContactList onEdit={handleEdit} searchQuery={searchQuery}/>
                </div>

            </div>

            {/* Modals */}
            <AddContactModal
                open={openAddContact}
                onClose={() => setOpenAddContact(false)}
            />

            <EditContactModal
                open={openEditContact}
                onClose={handleCloseEdit}
            />
        </section>
    );
};

export default ContactsPage;