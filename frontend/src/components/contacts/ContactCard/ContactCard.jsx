import { useTheme } from "../../../context/ThemeContext";
import ContactInfo from "./ContactInfo";
import ContactActions from "./ContactActions";

const ContactCard = ({ contact }) => {
    const { theme } = useTheme();

    return (
        <div
            className={`p-3 rounded-lg shadow mb-3 transition
                flex flex-col sm:flex-row gap-3
                hover:shadow-md
                ${theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
        >
            <div className="flex items-center flex-1 min-w-0 gap-3">
                <ContactInfo name={contact.name} phone={contact.phone} />
            </div>
            <ContactActions contact={contact} />
    
        </div>
    );
};

export default ContactCard;
