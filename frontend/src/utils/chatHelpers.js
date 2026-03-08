export const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDateLabel = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
};

export const groupMessagesByDate = (messages) => {
    const sorted = [...messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const groups = [];
    let lastLabel = null;
    sorted.forEach((msg) => {
        const label = formatDateLabel(msg.createdAt);
        if (label !== lastLabel) {
            groups.push({ type: "date-label", label, id: `label-${msg._id}` });
            lastLabel = label;
        }
        groups.push({ type: "message", ...msg });
    });
    return groups;
};