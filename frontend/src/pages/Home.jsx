import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

function Home() {
    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <ContactForm />
            <ContactList />
        </div>
    );
}

export default Home;
