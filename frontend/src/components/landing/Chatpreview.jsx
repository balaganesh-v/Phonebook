const chatHighlights = [
    "✅ Real-time messaging",
    "✅ File & image sharing",
    "✅ Group chats",
    "✅ Read receipts & typing indicators",
];

const Chatpreview = () => {
    return (
        <section id="chat" className="bg-slate-900 py-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Text */}
                <div className="flex-1">
                    <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Built-in Chat</span>
                    <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">
                        Chat With Your Contacts <br /> Without Leaving the App
                    </h2>
                    <p className="text-slate-400 text-base mb-6 leading-relaxed">
                        No need to switch between apps. ConnectBook's integrated chat lets you message,
                        share files, and make calls directly from your contact list.
                    </p>
                    <ul className="flex flex-col gap-3 list-none p-0 m-0">
                        {chatHighlights.map((item) => (
                            <li key={item} className="text-slate-300 text-sm">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Chat Window Mock */}
                <div className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto">

                    {/* Header */}
                    <div className="bg-slate-700 px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-white text-sm font-semibold">Alice Johnson</p>
                            <p className="text-emerald-400 text-xs">● Online</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 flex flex-col gap-3 min-h-48">
                        <div className="bg-slate-700 rounded-xl rounded-tl-none px-3 py-2 text-sm text-white w-fit max-w-xs">
                            Hey! Did you get my number update?
                        </div>
                        <div className="bg-emerald-500 rounded-xl rounded-tr-none px-3 py-2 text-sm text-slate-900 font-medium w-fit max-w-xs self-end">
                            Yes, updated in ConnectBook! 📒
                        </div>
                        <div className="bg-slate-700 rounded-xl rounded-tl-none px-3 py-2 text-sm text-white w-fit max-w-xs">
                            Great! Let's catch up soon 🎉
                        </div>
                        <div className="bg-emerald-500 rounded-xl rounded-tr-none px-3 py-2 text-sm text-slate-900 font-medium w-fit max-w-xs self-end">
                            Definitely! 🙌
                        </div>
                    </div>

                    {/* Input */}
                    <div className="px-4 pb-4 flex gap-2">
                        <input
                            className="flex-1 bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none"
                            placeholder="Type a message..."
                            readOnly
                        />
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chatpreview;