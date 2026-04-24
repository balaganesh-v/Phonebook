import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            id="home"
            className="relative bg-black text-white px-6 pt-28 pb-16 overflow-hidden min-h-[calc(100vh-80px)]"
        >
            {/* Background Glow */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-amber-500/10 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/10 blur-[120px] rounded-full"></div>

            <div className="relative max-w-6xl mx-auto flex items-center justify-center">

                <div className="text-center max-w-4xl">

                    {/* Badge */}
                    <div className="inline-flex items-center px-6 py-2 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-sm tracking-[4px] uppercase mb-8">
                        Smart Contact Platform
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl text-white leading-tight mb-6 [font-family:'Pacifico',cursive]">
                        Manage Contacts
                        <br />

                        <span className="text-amber-300 text-6xl md:text-7xl [font-family:'Dancing_Script',cursive]">
                            Chat Instantly
                        </span>
                    </h1>

                    {/* Text */}
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        yuhnie!! combines a modern phone book with seamless
                        real-time chat. Organize contacts, create groups, and
                        stay connected in one elegant workspace.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black font-semibold"
                        >
                            🚀 Start Free
                        </button>

                        <button className="px-8 py-3.5 rounded-2xl border border-white/10 text-zinc-300">
                            ▶ Watch Demo
                        </button>
                    </div>

                    <p className="mt-5 text-sm text-zinc-500">
                        No credit card required · Free forever plan
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Hero;