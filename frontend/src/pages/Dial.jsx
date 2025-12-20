import React from "react";
import { FiPhone } from "react-icons/fi";
import Home from "./Home";

const Dial = () => {
    return (
        <div className="p-4  bg-gray-100">
            <h1 className="flex items-center gap-2 font-semibold mb-4 text-xl">
                <FiPhone size={22} />
                <span clasName="sm:text-lg">Call logs</span>
            </h1>
        </div>
    );
};

export default Dial;
