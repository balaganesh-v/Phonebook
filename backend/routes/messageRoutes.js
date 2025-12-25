import express from "express";
import {
    getConversations,
    getMessages,
    startConversation
} from "../controllers/messageController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/conversations", authMiddleware, getConversations);
router.get("/messages/:conversationId", authMiddleware, getMessages);
router.post("/start", authMiddleware, startConversation);

export default router;
