const footerColumns = [
    {
        title: "Product",
        links: ["Features", "Pricing", "Changelog", "Roadmap"],
    },
    {
        title: "Chat",
        links: ["Group Chat", "File Sharing", "Notifications", "Integrations"],
    },
    {
        title: "Company",
        links: ["About", "Blog", "Privacy", "Terms"],
    },
];

const Footer = () => {
    return (
        <footer className="bg-black border-t border-amber-500/10 py-14 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">📒</span>

                        <h2 className="text-white text-2xl [font-family:'Pacifico',cursive]">
                            yuhnie !!
                        </h2>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs [font-family:'Poppins',sans-serif]">
                        Your contacts and chats — beautifully connected in one place.
                    </p>
                </div>

                {/* Columns */}
                {footerColumns.map((col) => (
                    <div key={col.title}>
                        <h3 className="text-amber-300 text-lg mb-4 [font-family:'Dancing_Script',cursive]">
                            {col.title}
                        </h3>

                        <ul className="space-y-3">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-zinc-400 hover:text-amber-300 text-sm transition-colors [font-family:'Poppins',sans-serif]"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom */}
            <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-zinc-500 text-sm [font-family:'Poppins',sans-serif]">
                    © 2025 yuhnie !! All rights reserved.
                </p>

                <div className="flex gap-5">
                    {["Twitter", "GitHub", "LinkedIn"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-zinc-500 hover:text-amber-300 text-sm transition-colors [font-family:'Poppins',sans-serif]"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;