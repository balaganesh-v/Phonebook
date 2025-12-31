import express from "express";
import {
    getConversations,
    getMessages,
    userStartsConversation
} from "../controllers/messageController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", authenticate, getConversations);
router.get("/:conversationId", authenticate, getMessages);
router.post("/user/starts/conversations", authenticate, userStartsConversation);

export default router;
