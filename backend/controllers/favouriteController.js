import {
    favouriteContactService,
    unFavouriteContactService,
    getFavouriteContactsService,
    favouriteConversationService,
    unFavouriteConversationService,
    getFavouriteConversationsService,
} from "../services/favouriteService.js";

// ── Contact Favourites ────────────────────────────────────────────────────

export const addContactFavourite = async (req, res, next) => {
    try {
        const result = await favouriteContactService(
            req.params.contactId,
            req.user
        );
        res.status(201).json({
            result,
            message: "Contact added to favourites",
        });
    } catch (error) {
        next(error);
    }
};

export const removeContactFavourite = async (req, res, next) => {
    try {
        const result = await unFavouriteContactService(
            req.params.contactId,
            req.user
        );
        if (!result) {
            return res.status(404).json({ message: "Favourite not found" });
        }
        res.json({ message: "Contact removed from favourites" });
    } catch (error) {
        next(error);
    }
};

export const getContactFavourites = async (req, res, next) => {
    try {
        const contactIds = await getFavouriteContactsService(req.user);
        res.json(contactIds.map(String));
    } catch (error) {
        next(error);
    }
};

// ── Conversation Favourites ───────────────────────────────────────────────

export const addConversationFavourite = async (req, res, next) => {
    try {
        const result = await favouriteConversationService(
            req.params.conversationId,
            req.user
        );
        res.status(201).json({
            result,
            message: "Conversation added to favourites",
        });
    } catch (error) {
        next(error);
    }
};

export const removeConversationFavourite = async (req, res, next) => {
    try {
        const result = await unFavouriteConversationService(
            req.params.conversationId,
            req.user
        );
        if (!result) {
            return res.status(404).json({ message: "Favourite not found" });
        }
        res.json({ message: "Conversation removed from favourites" });
    } catch (error) {
        next(error);
    }
};

export const getConversationFavourites = async (req, res, next) => {
    try {
        const conversationIds = await getFavouriteConversationsService(req.user);
        res.json(conversationIds.map(String));
    } catch (error) {
        next(error);
    }
};