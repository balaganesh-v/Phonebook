import React from "react";
import { FiUsers } from "react-icons/fi";
import ContactList from "../components/ContactList";

const Contacts = () => {
    return (
        <div className="p-4  bg-gray-100 min-h-screen">
            <h1 className="flex items-center gap-2 font-semibold ml-1 mb-4 text-xl">
                <FiUsers size={22} />
                <span clasName="sm:text-lg">Contacts</span>
            </h1>
            <ContactList />
        </div>
    );
};

export default Contacts;
