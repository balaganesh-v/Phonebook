import React from "react";

const contactsData = [
    {
        name: "Alice Johnson",
        role: "Marketing Lead",
        status: "Online",
        avatar: "A",
    },
    {
        name: "David Smith",
        role: "Project Manager",
        status: "Busy",
        avatar: "D",
    },
    {
        name: "Sophia Lee",
        role: "UI Designer",
        status: "Offline",
        avatar: "S",
    },
    {
        name: "Michael Brown",
        role: "Developer",
        status: "Online",
        avatar: "M",
    },
];

const Contacts = () => {
    return (
        <section
            id="contacts"
            className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-16 left-10 w-72 h-72 bg-amber-500/10 blur-[130px] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-400/10 blur-[130px] rounded-full"></div>

            <div className="relative max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-400 text-xs uppercase tracking-[5px] font-semibold [font-family:'Poppins',sans-serif]">
                        Contact Manager
                    </span>

                    <h1 className="mt-4 text-4xl md:text-5xl text-white [font-family:'Pacifico',cursive]">
                        Manage Your
                        <span className="block text-amber-300 [font-family:'Dancing_Script',cursive] text-5xl md:text-6xl">
                            Contacts Easily
                        </span>
                    </h1>

                    <p className="mt-5 text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed [font-family:'Poppins',sans-serif]">
                        Keep all your personal and professional contacts organized,
                        searchable, and always accessible.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-300 outline-none focus:border-amber-400/40"
                    />
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {contactsData.map((contact) => (
                        <div
                            key={contact.name}
                            className="rounded-3xl border border-amber-500/10 bg-zinc-950/95 backdrop-blur-xl p-5 hover:border-amber-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]"
                        >
                            <div className="flex items-center gap-4">

                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 text-black font-bold flex items-center justify-center text-lg">
                                    {contact.avatar}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-white text-lg [font-family:'Poppins',sans-serif] font-semibold">
                                        {contact.name}
                                    </h3>

                                    <p className="text-zinc-400 text-sm">
                                        {contact.role}
                                    </p>

                                    <p
                                        className={`text-xs mt-1 ${
                                            contact.status === "Online"
                                                ? "text-green-400"
                                                : contact.status === "Busy"
                                                ? "text-red-400"
                                                : "text-zinc-500"
                                        }`}
                                    >
                                        ● {contact.status}
                                    </p>
                                </div>

                                {/* Action */}
                                <button className="px-4 py-2 rounded-xl bg-amber-100 text-black text-sm font-semibold hover:scale-105 transition-all">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Contacts;