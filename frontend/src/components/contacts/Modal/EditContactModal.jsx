import { useEffect, useState } from "react";
import { useContacts } from "../../../context/ContactContext";

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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative animate-scaleUp">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Edit Contact
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    {/* Name */}
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Phone */}
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Email */}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Company */}
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Job Title */}
                    <input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Birthday */}
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Address */}
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="col-span-1 md:col-span-2 border border-gray-300
                                   rounded-lg px-4 py-2 resize-none
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Notes */}
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="col-span-1 md:col-span-2 border border-gray-300
                                   rounded-lg px-4 py-2 resize-none
                                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300
                                       hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white
                                       hover:bg-blue-700 transition
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400
                               hover:text-gray-600 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EditContactModal;
