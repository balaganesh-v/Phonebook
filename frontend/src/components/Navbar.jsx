import React from "react";
import { CheckCircle } from "lucide-react";

const NavBar = () => {
    return (
        <div className="w-full p-6 bg-gray-700 text-white flex items-center justify-center shadow-md">
            <div className="flex flex-row items-center gap-3 text-2xl font-semibold">
                <CheckCircle className="text-green-400 w-7 h-7" />
                <span>Yuhnie❤️!!</span>
            </div>
        </div>
    );
};

export default NavBar;
