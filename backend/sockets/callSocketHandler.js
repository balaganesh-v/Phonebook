import {
    getOnlineUsers
} from "./onlineUsers.js";

const callSocketHandler = (io, socket) => {

    console.log("📞 Call socket initialized:", socket.id);
    const userId = socket.user?._id?.toString();

    // Send own socket + user info
    socket.emit("me", {
        socketId: socket.id,
        user: socket.user
    });

    // =========================
    // 📞 CALL USER (RINGING)
    // =========================
    socket.on("call-user", ({ to }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) {
            socket.emit("call-error", { message: "User is offline" });
            return;
        }

        io.to(target.socketId).emit("incoming-call", {
            from: userId,
            callerInfo: socket.user
        });
    });

    // =========================
    // ✅ ACCEPT CALL
    // =========================
    socket.on("accept-call", ({ to }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("call-accepted", {
            by: userId
        });
    });

    // =========================
    // ❌ REJECT CALL
    // =========================
    socket.on("reject-call", ({ to }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("call-rejected", {
            by: userId
        });
    });

    // =========================
    // 📡 OFFER (WebRTC)
    // =========================
    socket.on("offer", ({ to, offer }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("offer", {
            from: userId,
            offer
        });
    });

    // =========================
    // 📡 ANSWER (WebRTC)
    // =========================
    socket.on("answer", ({ to, answer }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("answer", {
            from: userId,
            answer
        });
    });

    // =========================
    // 🌐 ICE CANDIDATES
    // =========================
    socket.on("ice-candidate", ({ to, candidate }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("ice-candidate", {
            from: userId,
            candidate
        });
    });

    // =========================
    // 🔚 END CALL
    // =========================
    socket.on("end-call", ({ to }) => {
        const onlineUsers = getOnlineUsers();
        const target = onlineUsers.find(u => u.userId === to);

        if (!target) return;

        io.to(target.socketId).emit("call-ended", {
            by: userId
        });
    });
};

export default callSocketHandler;