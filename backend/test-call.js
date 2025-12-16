import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";

// Contact IDs (must be valid MongoDB ObjectIds)
const BALAGANESH_ID = "69412e42cd84b35959e76f81";

// Caller is OPTIONAL
const EUNI_ID = null;

/**
 * Balaganesh (receiver)
 */
const balaganeshSocket = io(SERVER_URL);

balaganeshSocket.on("connect", () => {
    console.log("Balaganesh connected:", balaganeshSocket.id);

    // Receiver must be registered
    balaganeshSocket.emit("register", BALAGANESH_ID);
});

balaganeshSocket.on("incoming-call", (data) => {
    console.log("Balaganesh received call:", data);

    // Answer after 2 seconds
    setTimeout(() => {
        balaganeshSocket.emit("answer-call", { callId: data.callId });
        console.log("Balaganesh answered the call");

        // End call after 3 seconds
        setTimeout(() => {
            balaganeshSocket.emit("end-call", { callId: data.callId });
            console.log("Balaganesh ended the call");
        }, 3000);
    }, 2000);
});

/**
 * Euni (caller — optional)
 */
const euniSocket = io(SERVER_URL);

euniSocket.on("connect", () => {
    console.log("Euni connected:", euniSocket.id);

    // DO NOT register empty or null user
    // Registration is optional for caller-only test

    setTimeout(() => {
        euniSocket.emit("call-user", {
            callerId: null,                 // optional
            receiverId: BALAGANESH_ID,      // required
            callType: "audio"
        });

        console.log("Euni initiated call to Balaganesh");
    }, 2000);
});
