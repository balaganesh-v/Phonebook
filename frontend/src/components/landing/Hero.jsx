import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    const contacts = [
        { name: "Alice Johnson", phone: "+1 234 567" },
        { name: "Bob Smith", phone: "+1 345 678" },
        { name: "Carol White", phone: "+1 456 789" },
    ];

    return (
        <section id="home" className="bg-slate-900 text-white py-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
                        📞 Phone Book + 💬 Chat — All in One
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                        Manage Contacts. <br />
                        <span className="text-emerald-400">Chat Instantly.</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-8 max-w-lg">
                        ConnectBook combines a powerful phone book with real-time chat.
                        Store contacts, organize groups, and message anyone — all from one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-8 py-3.5 rounded-lg text-base transition-colors"
                        >
                            🚀 Start for Free
                        </button>
                        <button className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors">
                            ▶ Watch Demo
                        </button>
                    </div>
                    <p className="text-slate-500 text-sm mt-4">No credit card required · Free forever plan</p>
                </div>

                {/* Mock UI Preview */}
                <div className="flex-1 flex gap-3 justify-center">

                    {/* Phone Book Card */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 w-52 shadow-2xl">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Contacts</p>
                        {contacts.map((c) => (
                            <div key={c.name} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                                    {c.name[0]}
                                </div>
                                <div>
                                    <p className="text-white text-xs font-semibold">{c.name}</p>
                                    <p className="text-slate-400 text-xs">{c.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Card */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 w-52 shadow-2xl">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Chat</p>
                        <div className="flex flex-col gap-2">
                            <div className="bg-slate-700 rounded-xl rounded-tl-none px-3 py-2 text-xs text-white w-fit">
                                Hey! Are you free?
                            </div>
                            <div className="bg-emerald-500 rounded-xl rounded-tr-none px-3 py-2 text-xs text-slate-900 font-medium w-fit self-end">
                                Yes! Call me 📞
                            </div>
                            <div className="bg-slate-700 rounded-xl rounded-tl-none px-3 py-2 text-xs text-white w-fit">
                                On my way! 🚀
                            </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <input
                                className="flex-1 bg-slate-700 text-xs text-slate-300 rounded-lg px-2 py-1.5 outline-none border border-slate-600"
                                placeholder="Type..."
                                readOnly
                            />
                            <button className="bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1.5 rounded-lg">➤</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;