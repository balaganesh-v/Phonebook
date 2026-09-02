import * as favouriteRepo from "../repositories/favouriteRepository.js";

// ── Contact Favourites ────────────────────────────────────────────────────

export const favouriteContactService = (contactId, user) =>
    favouriteRepo.favouriteContact(contactId, user.id);

export const unFavouriteContactService = (contactId, user) =>
    favouriteRepo.unFavouriteContact(contactId, user.id);

export const getFavouriteContactsService = (user) =>
    favouriteRepo.getFavouriteContacts(user.id);

// ── Conversation Favourites ───────────────────────────────────────────────

export const favouriteConversationService = (conversationId, user) =>
    favouriteRepo.favouriteConversation(conversationId, user.id);

export const unFavouriteConversationService = (conversationId, user) =>
    favouriteRepo.unFavouriteConversation(conversationId, user.id);

export const getFavouriteConversationsService = (user) =>
    favouriteRepo.getFavouriteConversations(user.id);