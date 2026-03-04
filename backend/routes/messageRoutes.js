import express from "express";
import {
    getConversations,
    getMessages,
    userStartsConversation
} from "../controllers/messageController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all conversations List for the authenticated user
router.get("/conversations", authenticate, getConversations);
// Get all messages for a specific conversation by their ID
router.get("/:conversationId", authenticate, getMessages);
// Start a new conversation initiated by a user
router.post("/user/starts/conversation",authenticate,userStartsConversation);

export default router;
