import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";

const ContactForm = ({ setShowForm }) => {
    const { addContact, updateContact, editingContact, setEditingContact } = useContacts();

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
                formattedContact.birthday = dob.toISOString().split("T")[0];
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

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-4 rounded shadow mb-6">
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900"
            />

            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900"
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900"
                required
            />

            <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="rounded px-3 py-1 bg-green-400 text-white mb-2 hover:bg-green-500"
            >
                {showMore ? "− Show less" : "+ Show More"}
            </button>

            {showMore && (
                <>
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange}
                        className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900" />

                    <input name="company" placeholder="Company" value={form.company} onChange={handleChange}
                        className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900" />

                    <input name="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={handleChange}
                        className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900" />

                    <input type="date" name="birthday" value={form.birthday || ""} onChange={handleChange}
                        className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900" />

                    <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}
                        className="w-full p-2 mb-2 border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500 text-gray-900" />
                </>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-2 rounded text-white
                        ${isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
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
                    className={`flex-1 py-2 rounded text-white
                        ${isSubmitting
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
