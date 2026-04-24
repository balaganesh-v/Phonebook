// components/messages/window/UnknownSenderBanner.jsx

const UnknownSenderBanner = ({ senderName, onAccept, onIgnore }) => {
    return (
        <div className="shrink-0 border-b border-orange-500/10 bg-zinc-950 px-4 py-3">
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                
                {/* Text */}
                <div className="flex-1">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="text-white font-semibold">
                            {senderName || "This person"}
                        </span>{" "}
                        is not in your contacts.
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                        Accept this request to start replying.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onIgnore}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all"
                    >
                        Ignore
                    </button>

                    <button
                        onClick={onAccept}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-400 hover:bg-orange-300 text-black transition-all"
                    >
                        Accept
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UnknownSenderBanner;