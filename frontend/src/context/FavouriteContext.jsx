import {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";

import {
    getFavouriteContactIds,
    addContactFavourite,
    removeContactFavourite,
    getFavouriteConversationIds,
    addConversationFavourite,
    removeConversationFavourite,
} from "../services/favouriteService";

export const FavouriteContext = createContext(null);

export const FavouriteProvider = ({ children }) => {

    const [favouriteContactIds, setFavouriteContactIds] = useState([]);
    const [favouriteConversationIds, setFavouriteConversationIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── Load all favourites on mount ──────────────────────────────────────
    const initializeFavourites = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [contactIds, conversationIds] = await Promise.all([
                getFavouriteContactIds(),
                getFavouriteConversationIds(),
            ]);
            setFavouriteContactIds(contactIds || []);
            setFavouriteConversationIds(conversationIds || []);
        } catch (err) {
            console.error("Failed to load favourites:", err);
            setError("Failed to load favourites");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeFavourites();
    }, [initializeFavourites]);

    // ── Contact Favourites ────────────────────────────────────────────────

    const addToContactFavourites = useCallback(async (contactId) => {
        try {
            await addContactFavourite(contactId);
            setFavouriteContactIds((prev) => [...prev, String(contactId)]);
        } catch (err) {
            console.error("Failed to add contact favourite:", err);
            setError("Failed to add contact favourite");
        }
    }, []);

    const removeFromContactFavourites = useCallback(async (contactId) => {
        try {
            await removeContactFavourite(contactId);
            setFavouriteContactIds((prev) =>
                prev.filter((id) => id !== String(contactId))
            );
        } catch (err) {
            console.error("Failed to remove contact favourite:", err);
            setError("Failed to remove contact favourite");
        }
    }, []);

    const isContactFavourited = useCallback(
        (contactId) => favouriteContactIds.includes(String(contactId)),
        [favouriteContactIds]
    );

    // ── Conversation Favourites ───────────────────────────────────────────

    const addToConversationFavourites = useCallback(async (conversationId) => {
        try {
            await addConversationFavourite(conversationId);
            setFavouriteConversationIds((prev) => [...prev, String(conversationId)]);
        } catch (err) {
            console.error("Failed to add conversation favourite:", err);
            setError("Failed to add conversation favourite");
        }
    }, []);

    const removeFromConversationFavourites = useCallback(async (conversationId) => {
        try {
            await removeConversationFavourite(conversationId);
            setFavouriteConversationIds((prev) =>
                prev.filter((id) => id !== String(conversationId))
            );
        } catch (err) {
            console.error("Failed to remove conversation favourite:", err);
            setError("Failed to remove conversation favourite");
        }
    }, []);

    const isConversationFavourited = useCallback(
        (conversationId) => favouriteConversationIds.includes(String(conversationId)),
        [favouriteConversationIds]
    );

    // ── Context value ─────────────────────────────────────────────────────

    const value = useMemo(() => ({
        // state
        favouriteContactIds,
        favouriteConversationIds,
        loading,
        error,

        // contact favourite actions
        addToContactFavourites,
        removeFromContactFavourites,
        isContactFavourited,

        // conversation favourite actions
        addToConversationFavourites,
        removeFromConversationFavourites,
        isConversationFavourited,

        // refresh
        initializeFavourites,
    }), [
        favouriteContactIds,
        favouriteConversationIds,
        loading,
        error,
        addToContactFavourites,
        removeFromContactFavourites,
        isContactFavourited,
        addToConversationFavourites,
        removeFromConversationFavourites,
        isConversationFavourited,
        initializeFavourites,
    ]);

    return (
        <FavouriteContext.Provider value={value}>
            {children}
        </FavouriteContext.Provider>
    );
};