const features = [
    {
        icon: "📒",
        title: "Smart Phone Book",
        desc: "Store, search, and organize all your contacts with tags, groups, and custom fields.",
    },
    {
        icon: "💬",
        title: "Built-in Chat",
        desc: "Message your contacts directly without switching apps. Real-time, fast, and reliable.",
    },
    {
        icon: "👥",
        title: "Group Contacts",
        desc: "Create groups like Family, Work, or Friends and broadcast messages in one click.",
    },
    {
        icon: "🔍",
        title: "Instant Search",
        desc: "Find any contact by name, number, or tag in milliseconds — even across thousands of entries.",
    },
    {
        icon: "🔔",
        title: "Smart Notifications",
        desc: "Get notified for messages, missed calls, and birthdays automatically.",
    },
    {
        icon: "🔒",
        title: "Private & Secure",
        desc: "End-to-end encrypted chats and secure contact storage. Your data stays yours.",
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-slate-950 py-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Features</span>
                    <h2 className="text-4xl font-extrabold text-white mt-2">Everything You Need</h2>
                    <p className="text-slate-400 mt-3 text-base max-w-xl mx-auto">
                        One app to replace your scattered contacts and multiple chat tools.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
                        >
                            <div className="text-3xl mb-4">{f.icon}</div>
                            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;