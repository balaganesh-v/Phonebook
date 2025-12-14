import { useContacts } from "../context/ContactContext";

const ContactSearch = () => {
    const { searchQuery, setSearchQuery } = useContacts();

    return (
        <div className="w-full max-w-2xl mx-auto mb-4 px-2">
            <input
                type="text"
                placeholder="Search by contact name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500  "
            />
        </div>
    );
};

export default ContactSearch;
