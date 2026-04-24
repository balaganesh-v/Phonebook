import { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;

        onSend(text.trim());
        setText("");
    };

    return (
        <div className="w-full shrink-0 border-t border-orange-500/10 bg-black px-4 py-3 mb-16">
            <div className="flex items-center gap-3">

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSend()
                    }
                    placeholder="Type a message..."
                    className="flex-1 px-5 py-3 rounded-full bg-zinc-950 border border-zinc-800 text-white text-sm outline-none focus:border-orange-400 placeholder:text-zinc-500"
                />

                <button
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="w-11 h-11 rounded-full bg-orange-400 hover:bg-orange-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black flex items-center justify-center shrink-0"
                >
                    <IoSend />
                </button>

            </div>
        </div>
    );
};

export default MessageInput;