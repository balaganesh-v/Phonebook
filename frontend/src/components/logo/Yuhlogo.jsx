import React from "react";
import yuh from "../../assets/phone-chat.png";

const Yuhlogo = () => {
    return (
        <div className="flex items-center gap-3 cursor-pointer select-none">

            {/* Logo */}
            <img
                src={yuh}
                alt="Yuhnie Logo"
                className="w-8 h-8 object-cover"
            />

            {/* Text */}
            <h1 className="text-white text-xl [font-family:'Pacifico',cursive]">
                Yuhnie!!
            </h1>

        </div>
    );
};

export default Yuhlogo;