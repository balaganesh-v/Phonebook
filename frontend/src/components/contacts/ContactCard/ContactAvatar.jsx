const ContactAvatar = ({ name, isOnline }) => {
    const initials = name
        ?.split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {initials}
            </div>

            {/* ✅ online indicator */}
            {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
        </div>
    );
};

export default ContactAvatar;
