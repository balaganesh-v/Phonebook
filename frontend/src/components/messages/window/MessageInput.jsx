import { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-700 bg-slate-800 shrink-0">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-full outline-none transition-colors placeholder-slate-500"
            />
            <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 flex items-center justify-center transition-all shrink-0"
            >
                <IoSend className="text-sm" />
            </button>
        </div>
    );
};

export default MessageInput;