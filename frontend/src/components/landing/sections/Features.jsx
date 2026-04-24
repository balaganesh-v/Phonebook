const features = [
    {
        icon: "📒",
        title: "Smart Phone Book",
        desc: "Store, search, and organize all your contacts with tags and custom fields.",
    },
    {
        icon: "💬",
        title: "Built-in Chat",
        desc: "Message your contacts directly without switching apps. Real-time, fast, and reliable.",
    },
    {
        icon: "🔍",
        title: "Instant Search",
        desc: "Find any contact by name, number, or tag in milliseconds across thousands of entries.",
    },
    {
        icon: "🔒",
        title: "Private & Secure",
        desc: "Encrypted chats and secure contact storage. Your data always stays yours.",
    },
];

const Features = () => {
    return (
        <section
            id="features"
            className="relative bg-black py-24 px-6 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/10 blur-[130px] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-300/10 blur-[130px] rounded-full"></div>

            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-300 text-sm uppercase tracking-[4px] font-semibold [font-family:'Poppins',sans-serif]">
                        Features
                    </span>

                    <h2 className="text-4xl text-white mt-4 [font-family:'Pacifico',cursive]">
                        Everything You Need
                    </h2>

                    <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto [font-family:'Poppins',sans-serif]">
                        One app to replace your scattered contacts and multiple chat tools.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group rounded-3xl border border-amber-500/10 bg-zinc-950/90 backdrop-blur-xl p-8 hover:border-amber-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]"
                        >
                            {/* Icon + Title Row */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                    {f.icon}
                                </div>

                                <h3 className="text-white text-2xl [font-family:'Dancing_Script',cursive] leading-none">
                                    {f.title}
                                </h3>
                            </div>

                            {/* Desc */}
                            <p className="text-zinc-400 leading-relaxed text-base pl-[56px] [font-family:'Poppins',sans-serif]">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;