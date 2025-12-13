import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

function Home(){
    return (
        <div class="max-w-2xl mx-auto">
            <ContactForm />
            <ContactList />
        </div>
    );
};

export default Home;
