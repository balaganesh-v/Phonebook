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

// 🔒 Protect all routes
router.use(authenticate);

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
