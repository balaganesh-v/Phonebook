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
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">📒</span>
                        <span className="text-white font-bold text-lg">ConnectBook</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Your contacts and chats — smarter, together.
                    </p>
                </div>

                {/* Link Columns */}
                {footerColumns.map((col) => (
                    <div key={col.title}>
                        <p className="text-white font-semibold text-sm mb-3">{col.title}</p>
                        <ul className="flex flex-col gap-2 list-none p-0 m-0">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">© 2025 ConnectBook. All rights reserved.</p>
                <div className="flex gap-4">
                    {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                        <a key={s} href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">
                            {s}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;