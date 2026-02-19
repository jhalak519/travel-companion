import React, { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('travel_favorites');
            if (saved) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFavorites(JSON.parse(saved));
            }
        } catch {
            localStorage.removeItem('travel_favorites');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('travel_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (place) => {
        setFavorites((prev) => {
            if (!prev.some(p => p.location_id === place.location_id)) {
                return [...prev, place];
            }
            return prev;
        });
    };

    const removeFavorite = (placeId) => {
        setFavorites((prev) => prev.filter(p => p.location_id !== placeId));
    };

    const isFavorite = (placeId) => {
        return favorites.some(p => p.location_id === placeId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
