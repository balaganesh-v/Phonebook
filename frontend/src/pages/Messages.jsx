import React from "react";
import MessagesPage from "../components/Messages/MessagesPage.jsx";
import { MdChat } from "react-icons/md";

const Messages = () => {
    return (
        <div className="flex flex-col flex-1 h-full p-4 min-h-0">

            {/* Header (fixed height) */}
            <div className="flex items-center space-x-2 mb-3 shrink-0">
                <MdChat className="text-3xl text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-800">
                    Messages
                </h1>
            </div>

            {/* Content (fills remaining space) */}
            <div className="flex-1 min-h-0">
                <MessagesPage />
            </div>

        </div>
    );
};


export default Messages;
