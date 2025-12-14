import { useContacts } from "../hooks/useContacts";

const ContactSearch = () => {
    const { searchQuery, setSearchQuery } = useContacts();

    return (
        <div className="w-full max-w-2xl mx-auto mb-4 px-2">
            <input
                type="text"
                placeholder="Search by contact name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            />
        </div>
    );
};

export default ContactSearch;
