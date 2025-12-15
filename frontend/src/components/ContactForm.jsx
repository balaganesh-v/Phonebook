import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useTheme } from "../context/ThemeContext";

const ContactForm = ({ setShowForm }) => {
    const { addContact, updateContact, editingContact, setEditingContact } = useContacts();
    const { theme } = useTheme();

    const [showMore, setShowMore] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        company: "",
        jobTitle: "",
        birthday: "",
        notes: "",
    });

    useEffect(() => {
        if (editingContact) {
            const formattedContact = { ...editingContact };

            if (formattedContact.birthday) {
                const dob = new Date(formattedContact.birthday);
                formattedContact.birthday = !isNaN(dob) ? dob.toISOString().split("T")[0] : "";
            }

            setForm(formattedContact);
            setShowMore(true);
        }
    }, [editingContact]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            if (editingContact) {
                await updateContact(editingContact._id, form);
            } else {
                await addContact(form);
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save contact:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (!isSubmitting) resetForm();
    };

    const resetForm = () => {
        setForm({
            name: "",
            phone: "",
            email: "",
            address: "",
            company: "",
            jobTitle: "",
            birthday: "",
            notes: "",
        });
        setShowMore(false);
        setShowForm(false);
        setEditingContact(null);
    };

    const inputClasses = `w-full p-2 mb-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500
        ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-600 text-gray-900 placeholder-gray-500"}`;

    const buttonClasses = (bgColor) =>
        `flex-1 py-2 rounded text-white ${isSubmitting ? "cursor-not-allowed opacity-60" : bgColor} hover:brightness-110`;

    return (
        <form
            onSubmit={handleSubmit}
            className={`max-w-2xl p-4 rounded shadow mb-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClasses}
            />

            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={inputClasses}
            />


            <button
                type="button"
                onClick={() => setShowMore(prev => !prev)}
                className={`mb-2 bg-transparent p-0 font-medium transition-colors ${theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
            >
                {showMore ? "Show less" : "Show more"}
            </button>

            {showMore && (
                <>
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <input
                        name="jobTitle"
                        placeholder="Job Title"
                        value={form.jobTitle}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <input
                        type="date"
                        name="birthday"
                        value={form.birthday || ""}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonClasses(theme === "dark" ? "bg-blue-600" : "bg-blue-500")}
                >
                    {isSubmitting
                        ? editingContact
                            ? "Updating..."
                            : "Saving..."
                        : editingContact
                            ? "Update Contact"
                            : "Save Contact"}
                </button>

                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleCancel}
                    className={buttonClasses(theme === "dark" ? "bg-gray-700" : "bg-gray-400")}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
