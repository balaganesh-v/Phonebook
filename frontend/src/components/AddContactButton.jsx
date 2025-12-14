import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import ContactForm from "./ContactForm";

const AddContactButton = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto mb-6 px-2">
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-lg bg-green-200 text-gray-500 hover:bg-green-200 transition duration-200 hover:shadow-lg"
                >
                    <FiUserPlus className="text-2xl" />
                    <span className="text-lg font-semibold">Add Contact</span>
                </button>
            )}

            {showForm && <ContactForm setShowForm={setShowForm} />}
        </div>
    );
};

export default AddContactButton;
