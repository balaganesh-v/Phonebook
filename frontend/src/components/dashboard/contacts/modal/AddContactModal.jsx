import { useState } from "react";
import { useContacts } from "../../../../hooks/useContacts.js";

const AddContactModal = ({ open, onClose }) => {
    const { addContact, loading } = useContacts();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        company: "",
        jobTitle: "",
        birthday: "",
        notes: "",
    });

    if (!open) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addContact(formData);
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            company: "",
            jobTitle: "",
            birthday: "",
            notes: "",
        });
        onClose();
    };

    const inputClass =
        "bg-slate-900 border border-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none";

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl relative animate-scaleUp">

                <h2 className="text-2xl font-bold mb-6 text-white">
                    Add New Contact
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" value={formData.name} onChange={handleChange}
                        placeholder="Full Name" required className={inputClass} />

                    <input name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="Phone Number" required className={inputClass} />

                    <input name="email" value={formData.email} onChange={handleChange}
                        placeholder="Email Address" className={inputClass} />

                    <input name="company" value={formData.company} onChange={handleChange}
                        placeholder="Company" className={inputClass} />

                    <input name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                        placeholder="Job Title" className={inputClass} />

                    <input type="date" name="birthday" value={formData.birthday}
                        onChange={handleChange} className={inputClass} />

                    <textarea name="address" value={formData.address} onChange={handleChange}
                        placeholder="Address" rows={2}
                        className={`col-span-1 md:col-span-2 resize-none ${inputClass}`} />

                    <textarea name="notes" value={formData.notes} onChange={handleChange}
                        placeholder="Notes" rows={2}
                        className={`col-span-1 md:col-span-2 resize-none ${inputClass}`} />

                    <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
                        <button type="button" onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Saving..." : "Save Contact"}
                        </button>
                    </div>
                </form>

                {/* Close Button */}
                <button onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AddContactModal;