import React from "react";

const Main = () => {
    return (
        <section className="h-[calc(100vh-80px)] bg-black text-white flex items-center justify-center px-4 -mt-16">

            <div className="text-center max-w-2xl w-full">

                <p className="text-orange-400 text-xs uppercase tracking-[3px] mb-3 [font-family:'Poppins',sans-serif]">
                    Dashboard
                </p>

                <h1 className="text-3xl md:text-5xl leading-snug [font-family:'Pacifico',cursive]">
                    Welcome to
                    <br />

                    <span className="text-orange-400 text-4xl md:text-6xl [font-family:'Dancing_Script',cursive]">
                        yuhniee's Dashboard !!
                    </span>
                </h1>

                <p className="mt-5 text-zinc-400 text-sm md:text-base [font-family:'Poppins',sans-serif]">
                    Manage your contacts, chats and favourites
                    in one beautiful place.
                </p>

            </div>

        </section>
    );
};

export default Main;