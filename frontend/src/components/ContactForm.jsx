import { useEffect, useState } from "react";
import { useContacts } from "../hooks/useContacts";

const ContactForm = () => {
    const { addContact, updateContact, editingContact } = useContacts();
    const [showMore, setShowMore] = useState(false);

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
            // Convert birthday ISO string to YYYY-MM-DD for date input
            const formattedContact = { ...editingContact };
            if (formattedContact.birthday) {
                const dob = new Date(formattedContact.birthday);
                formattedContact.birthday = dob.toISOString().split("T")[0];
            }
            setForm(formattedContact);
            setShowMore(true);
        }
    }, [editingContact]);

    const handleChange = (event) =>
        setForm({ ...form, [event.target.name]: event.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingContact) {
            updateContact(editingContact._id, form);
        } else {
            addContact(form);
        }

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
    };

    const show = () => {
        setShowMore(!showMore)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " required />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " required />

            <button type="button" onClick={show} className=" rounded px-2 py-1 bg-green-400 text-white mb-2 hover:bg-green-500">
                {showMore ? "− Hide More Details" : "+ Add More Details"}
            </button>

            {showMore && (
                <>
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " />
                    <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " />
                    <input name="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " />
                    <input type="date" name="birthday" value={form.birthday || ""} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " />
                    <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="w-full p-2 mb-2 focus border rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400
                focus:border-blue-400 " />
                </>
            )}

            <button className="w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                {editingContact ? "Update Contact" : "Save Contact"}
            </button>
        </form>
    );
};

export default ContactForm;
