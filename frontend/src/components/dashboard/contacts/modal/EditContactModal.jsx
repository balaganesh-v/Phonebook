import { useEffect, useState } from "react";
import { useContacts } from "../../../../hooks/useContacts.js";
import { FiX } from "react-icons/fi";

const EditContactModal = ({ open, onClose }) => {
    const { editingContact, updateContact, loading } = useContacts();

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

    useEffect(() => {
        if (editingContact && open) {
            setFormData({
                name: editingContact.name || "",
                phone: editingContact.phone || "",
                email: editingContact.email || "",
                address: editingContact.address || "",
                company: editingContact.company || "",
                jobTitle: editingContact.jobTitle || "",
                birthday: editingContact.birthday?.slice(0, 10) || "",
                notes: editingContact.notes || "",
            });
        }
    }, [editingContact, open]);

    if (!open || !editingContact) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = editingContact._id || editingContact.id;
        await updateContact(id, formData);
        onClose();
    };

    const inputClass = "w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-slate-500";

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl relative">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                    <h2 className="text-lg font-bold text-white">Edit Contact</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Name */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={inputClass}
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Phone Number</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                            className={inputClass}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={inputClass}
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Company</label>
                        <input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company name"
                            className={inputClass}
                        />
                    </div>

                    {/* Job Title */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Job Title</label>
                        <input
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            className={inputClass}
                        />
                    </div>

                    {/* Birthday */}
                    <div>
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            className={`${inputClass} [color-scheme:dark]`}
                        />
                    </div>

                    {/* Address */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street, City, Country"
                            rows={2}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Notes */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="text-slate-300 text-xs font-medium block mb-1.5">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any additional notes..."
                            rows={2}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 text-sm font-medium transition-colors bg-transparent cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold text-sm transition-colors"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;