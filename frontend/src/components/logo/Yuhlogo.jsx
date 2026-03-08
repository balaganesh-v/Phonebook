import React from 'react';
import yuh from "../../assets/yuhChat.png";

const Yuhlogo = () => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <img src={yuh} className="w-10 h-10 rounded-lg" />
                <span className="text-xl font-bold text-white ">yuhnie !!</span>
            </div>
        </div>
    )
}

export default Yuhlogo