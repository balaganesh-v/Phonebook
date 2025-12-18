import express from "express";
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
} from "../controllers/contactController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate); // 🔒 protect all routes

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
