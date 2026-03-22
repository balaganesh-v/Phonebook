import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";

export const useFavourites = () => {
    const context = useContext(FavouriteContext);
    if (!context) {
        throw new Error("Favourites must be used within FavouritesProvider");
    }
    return context;
};