const chatHighlights = [
    "✅ Real-time messaging",
    "✅ File & image sharing",
    "✅ Group chats",
    "✅ Read receipts & typing indicators",
];

const Chatpreview = () => {
    return (
        <section
            id="chat"
            className="min-h-screen bg-black text-white py-24 px-6 scroll-mt-20 relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-16 left-10 w-72 h-72 bg-amber-500/10 blur-[130px] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-400/10 blur-[130px] rounded-full"></div>

            <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left Content */}
                <div className="flex-1">
                    <span className="text-amber-400 text-xs uppercase tracking-[5px] font-semibold [font-family:'Poppins',sans-serif]">
                        Built-in Chat
                    </span>

                    <h2 className="mt-4 text-3xl md:text-4xl text-white leading-tight [font-family:'Pacifico',cursive]">
                        Chat With Contacts <br />

                        <span className="text-amber-300 text-4xl md:text-5xl [font-family:'Dancing_Script',cursive]">
                            Without Leaving App
                        </span>
                    </h2>

                    <p className="mt-5 text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl [font-family:'Poppins',sans-serif]">
                        yuhnie!! gives you elegant real-time messaging inside your
                        contact platform. Send files, chat instantly, and stay
                        connected in one place.
                    </p>

                    <ul className="mt-7 space-y-3">
                        {chatHighlights.map((item) => (
                            <li
                                key={item}
                                className="text-zinc-300 text-sm md:text-base [font-family:'Poppins',sans-serif]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Card */}
                <div className="flex-1 w-full max-w-sm rounded-3xl border border-amber-500/10 bg-zinc-950/95 backdrop-blur-xl shadow-[0_0_40px_rgba(251,191,36,0.08)] overflow-hidden">

                    {/* Header */}
                    <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 text-black text-sm font-bold flex items-center justify-center [font-family:'Poppins',sans-serif]">
                            A
                        </div>

                        <div>
                            <p className="text-white text-sm font-semibold [font-family:'Poppins',sans-serif]">
                                Alice Johnson
                            </p>

                            <p className="text-amber-300 text-[11px] [font-family:'Poppins',sans-serif]">
                                ● Online
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="p-5 flex flex-col gap-3 min-h-[310px]">

                        {/* Receiver */}
                        <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-white w-fit max-w-[80%] leading-relaxed">
                            Hey! Did you get my number update? 😊
                        </div>

                        {/* Sender */}
                        <div className="bg-amber-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm text-zinc-900 font-medium w-fit max-w-[80%] self-end leading-relaxed">
                            Yes, updated in yuhnie!! 📒✨
                        </div>

                        {/* Receiver */}
                        <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-white w-fit max-w-[80%] leading-relaxed">
                            Great! Let's catch up soon 🎉
                        </div>

                        {/* Sender */}
                        <div className="bg-amber-100 rounded-2xl rounded-tr-none px-4 py-2 text-sm text-zinc-900 font-medium w-fit max-w-[80%] self-end leading-relaxed">
                            Definitely! 🙌🔥
                        </div>

                    </div>

                    {/* Input */}
                    <div className="px-4 pb-4 flex gap-2">
                        <input
                            readOnly
                            placeholder="Type a message..."
                            className="flex-1 bg-white/[0.03] border border-white/10 text-zinc-300 text-sm rounded-xl px-4 py-2.5 outline-none [font-family:'Poppins',sans-serif]"
                        />

                        <button className="px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-400 text-black font-bold hover:scale-105 transition-all duration-300">
                            ➤
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Chatpreview;