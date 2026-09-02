import express from "express";
import {
    addContactFavourite,
    removeContactFavourite,
    getContactFavourites,
    addConversationFavourite,
    removeConversationFavourite,
    getConversationFavourites,
} from "../controllers/favouriteController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

// ── Contact Favourites ────────────────────────────────────────────────────
router.get("/contacts", getContactFavourites);
router.post("/contacts/:contactId", addContactFavourite);
router.delete("/contacts/:contactId", removeContactFavourite);

// ── Conversation Favourites ───────────────────────────────────────────────
router.get("/conversations", getConversationFavourites);
router.post("/conversations/:conversationId", addConversationFavourite);
router.delete("/conversations/:conversationId", removeConversationFavourite);

export default router;


// ```

// ---

// ## ⚠️ Important — Drop Old Collection

// Since the schema changed completely, drop the old `favourites` collection in **MongoDB Atlas**:
// ```
// Atlas → Browse Collections → phoneBookApplications → favourites → Delete Collection