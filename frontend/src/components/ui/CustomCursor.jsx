import { useEffect, useRef, useState } from "react";
import { Feather } from "lucide-react";

export default function CustomCursor({ theme = "gold" }) {
    const cursorRef = useRef(null);

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    const [hovering, setHovering] = useState(false);
    const [particles, setParticles] = useState([]);

    const themes = {
        gold: {
            glow: "rgba(255,170,0,0.22)",
            color: "#fbbf24",
            icon: "text-amber-400",
        },
        blue: {
            glow: "rgba(59,130,246,0.22)",
            color: "#60a5fa",
            icon: "text-blue-400",
        },
        purple: {
            glow: "rgba(168,85,247,0.22)",
            color: "#c084fc",
            icon: "text-purple-400",
        },
    };

    const current = themes[theme];

    useEffect(() => {
        const moveMouse = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const id = Date.now() + Math.random();

            setParticles((prev) => [
                ...prev.slice(-12),
                {
                    id,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 5 + 2,
                    dx: Math.random() * 18 - 9,
                    dy: Math.random() * 18 - 9,
                },
            ]);
        };

        window.addEventListener("mousemove", moveMouse);

        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.14;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.14;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `
                    translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
                    translate(-50%, -50%)
                `;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", moveMouse);
        };
    }, []);

    useEffect(() => {
        const items = document.querySelectorAll(
            "button,a,input,textarea,select,[role='button'],.cursor-hover"
        );

        const enter = () => setHovering(true);
        const leave = () => setHovering(false);

        items.forEach((item) => {
            item.addEventListener("mouseenter", enter);
            item.addEventListener("mouseleave", leave);
        });

        return () => {
            items.forEach((item) => {
                item.removeEventListener("mouseenter", enter);
                item.removeEventListener("mouseleave", leave);
            });
        };
    }, []);

    return (
        <>
            {/* Main Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
            >
                {/* Glow Only */}
                <div
                    className={`absolute blur-2xl rounded-full transition-all duration-300 ${
                        hovering ? "w-20 h-20" : "w-14 h-14"
                    }`}
                    style={{
                        background: current.glow,
                        left: hovering ? "-40px" : "-28px",
                        top: hovering ? "-40px" : "-28px",
                    }}
                />

                {/* Feather Icon */}
                <div
                    className={`absolute transition-all duration-300 ${
                        current.icon
                    } ${
                        hovering
                            ? "scale-125 rotate-12 drop-shadow-[0_0_10px_currentColor]"
                            : "scale-100"
                    }`}
                    style={{
                        left: "-10px",
                        top: "-10px",
                    }}
                >
                    <Feather size={20} strokeWidth={2.2} />
                </div>
            </div>

            {/* Spark Trail */}
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="fixed pointer-events-none rounded-full animate-ping z-[9998]"
                    style={{
                        left: p.x + p.dx,
                        top: p.y + p.dy,
                        width: p.size,
                        height: p.size,
                        background: current.color,
                        opacity: 0.65,
                        transform: "translate(-50%, -50%)",
                        animationDuration: "700ms",
                    }}
                    onAnimationEnd={() =>
                        setParticles((prev) =>
                            prev.filter((item) => item.id !== p.id)
                        )
                    }
                />
            ))}
        </>
    );
}