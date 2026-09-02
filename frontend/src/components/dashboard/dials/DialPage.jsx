import React from "react";
import { MdDialpad } from "react-icons/md";

const DialPage = () => {
    const numbers = [
        ["1", ""],
        ["2", "ABC"],
        ["3", "DEF"],
        ["4", "GHI"],
        ["5", "JKL"],
        ["6", "MNO"],
        ["7", "PQRS"],
        ["8", "TUV"],
        ["9", "WXYZ"],
        ["*", ""],
        ["0", "+"],
        ["#", ""],
    ];

    return (
        <section className="w-full bg-black text-white px-6 py-5 overflow-y-auto min-h-[calc(100vh-120px)]">

            {/* Main Wrapper same start/end as navbar/footer */}
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 md:ml-8 mb-6">
                    <MdDialpad className="text-amber-300 text-2xl" />

                    <h1 className="text-2xl [font-family:'Pacifico',cursive]">
                        Dials
                    </h1>
                </div>

                {/* Dial Content */}
                <div className="max-w-sm mx-auto">

                    {/* Screen */}
                    <div className="h-14 rounded-2xl border border-amber-500/10 bg-zinc-950 flex items-center justify-center text-2xl tracking-[5px] text-amber-300 mb-5">
                        000000
                    </div>

                    {/* Dial Pad */}
                    <div className="grid grid-cols-3 gap-3">

                        {numbers.map(([num, text]) => (
                            <button
                                key={num}
                                className="h-16 rounded-2xl bg-zinc-950 border border-white/5 hover:border-amber-400/30 hover:bg-white/[0.03] transition-all flex flex-col items-center justify-center"
                            >
                                <span className="text-xl text-white">
                                    {num}
                                </span>

                                <span className="text-[9px] text-zinc-500 tracking-[2px]">
                                    {text}
                                </span>
                            </button>
                        ))}

                    </div>

                    {/* Call Button */}
                    <button className="w-full mt-5 h-14 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black font-semibold text-lg shadow-[0_0_20px_rgba(251,191,36,0.18)]">
                        📞 Call
                    </button>

                </div>
            </div>
        </section>
    );
};

export default DialPage;