import React from "react";
import { FiUsers } from "react-icons/fi";

const Contacts = () => {
    return (
        <div className="p-4  bg-gray-100">
            <h1 className="flex items-center gap-2 font-semibold ml-1 mb-4 text-xl">
                <FiUsers size={22} />
                <span clasName="sm:text-lg">Contacts</span>
            </h1>
        </div>
    );
};

export default Contacts;
