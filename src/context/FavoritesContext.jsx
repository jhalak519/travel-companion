import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('travel_favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
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

export const useFavorites = () => useContext(FavoritesContext);
