const ContactAvatar = ({ name, isOnline }) => {
    const initials = name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative shrink-0">

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 text-black flex items-center justify-center font-bold text-sm shadow-[0_0_18px_rgba(251,191,36,0.18)]">
                {initials || "?"}
            </div>

            {/* Online Indicator */}
            {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-orange-400 border-2 border-black rounded-full shadow-sm" />
            )}

        </div>
    );
};

export default ContactAvatar;