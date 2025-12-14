import { useContacts } from "../hooks/useContacts";

const ContactCard = ({ contact }) => {
    const { deleteContact, setEditingContact } = useContacts();

    return (
        <div className="bg-white p-4 rounded-lg shadow flex justify-between hover:shadow-lg">
            <div>
                <h2 className="text-lg font-semibold mb-1">{contact.name}</h2>
                <p className="text-sm text-gray-700">{contact.phone}</p>
                <p className="text-sm text-gray-700">{contact.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => setEditingContact(contact)}
                    className="text-lg text-blue-600 hover:text-blue-800"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteContact(contact._id)}
                    className="text-lg text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
