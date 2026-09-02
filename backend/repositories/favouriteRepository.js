import mongoose from "mongoose";
import Favourites from "../models/Favourites.js";

// ── Helper — get or create the user's favourite document ─────────────────
const getOrCreate = (userId) =>
    Favourites.findOneAndUpdate(
        { userId },
        { $setOnInsert: { userId } },
        { upsert: true, returnDocument: "after" }
    );

// ── Contact Favourites ────────────────────────────────────────────────────

export const favouriteContact = async (contactId, userId) => {
    return Favourites.findOneAndUpdate(
        { userId },
        {
            $addToSet: { contactIds: contactId },   // addToSet prevents duplicates
            $setOnInsert: { userId },
        },
        { upsert: true, returnDocument: "after" }
    );
};

export const unFavouriteContact = async (contactId, userId) => {
    return Favourites.findOneAndUpdate(
        { userId },
        { $pull: { contactIds: contactId } },
        { returnDocument: "after" }
    );
};

export const getFavouriteContacts = async (userId) => {
    const doc = await getOrCreate(userId);
    return doc?.contactIds || [];
};

// ── Conversation Favourites ───────────────────────────────────────────────

export const favouriteConversation = async (conversationId, userId) => {
    return Favourites.findOneAndUpdate(
        { userId },
        {
            $addToSet: { conversationIds: conversationId },
            $setOnInsert: { userId },
        },
        { upsert: true, returnDocument: "after" }
    );
};

export const unFavouriteConversation = async (conversationId, userId) => {
    return Favourites.findOneAndUpdate(
        { userId },
        { $pull: { conversationIds: conversationId } },
        { returnDocument: "after" }
    );
};

export const getFavouriteConversations = async (userId) => {
    const doc = await getOrCreate(userId);
    return doc?.conversationIds || [];
};