import AddContactButton from "../components/AddContactButton";
import ContactList from "../components/ContactList";
import ContactSearch from "../components/ContactSearch";

function Home() {
    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <AddContactButton />
            <ContactSearch />
            <ContactList />
        </div>
    );
}

export default Home;
