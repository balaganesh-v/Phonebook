import { useTheme } from "../../context/ThemeContext";

const ContactInfo = ({ name, phone }) => {
    const { theme } = useTheme();

    return (
        <div className="min-w-0">
            <p
                className={`font-semibold truncate
                    ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                title={name}
            >
                {name}
            </p>

            <p
                className={`text-sm truncate
                    ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
                {phone || "No phone number"}
            </p>
        </div>
    );
};

export default ContactInfo;
