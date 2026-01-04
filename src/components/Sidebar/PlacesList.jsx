import React from 'react';
import PlaceCard from './PlaceCard';

const PlacesList = ({ places, selectedPlace, onPlaceSelect, loading }) => {
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-3 rounded-lg h-24 animate-pulse flex gap-3">
                        <div className="w-24 bg-gray-200 rounded-md"></div>
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!places?.length) return null;

    return (
        <div className="space-y-1">
            {places.map((place, i) => (
                <PlaceCard
                    key={place.location_id || i}
                    place={place}
                    selected={Number(place.location_id) === Number(selectedPlace?.location_id)}
                    onClick={() => onPlaceSelect(place)}
                    refProp={/* We can handle ref scrolling later */ null}
                />
            ))}
        </div>
    );
};

export default PlacesList;
