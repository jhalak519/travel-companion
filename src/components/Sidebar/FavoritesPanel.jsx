import React from 'react';
import PropTypes from 'prop-types';
import { useFavorites } from '@/context/useFavorites';
import PlaceCard from './PlaceCard';

const FavoritesPanel = ({ onPlaceSelect, onBack }) => {
    const { favorites } = useFavorites();

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-30 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Favorites</h2>
                <button onClick={onBack} className="text-sm text-pink-500 font-medium">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {favorites.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        No favorites yet. <br /> Heart a place to save it!
                    </div>
                ) : (
                    favorites.map((place) => (
                        <PlaceCard
                            key={place.location_id}
                            place={place}
                            onClick={() => onPlaceSelect(place)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

FavoritesPanel.propTypes = {
    onPlaceSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default FavoritesPanel;
