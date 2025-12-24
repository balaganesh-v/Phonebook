import { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div className="flex p-4 border-t gap-2">
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Type a message"
            />
            <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 rounded"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
