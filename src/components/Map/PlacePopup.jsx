import React from "react";
import { Popup } from "react-map-gl/mapbox";
import { FaStar } from "react-icons/fa";

const PlacePopup = ({ place, onClose }) => {
  return (
    <Popup
      longitude={Number(place.longitude)}
      latitude={Number(place.latitude)}
      anchor="top"
      onClose={onClose}
      closeOnClick={false}
      className="z-50"
    >
      <div className="w-48 bg-white rounded-lg overflow-hidden p-1">
        {place.photo ? (
          <img
            src={place.photo.images.small.url}
            alt={place.name}
            className="w-full h-24 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
        <h3 className="font-semibold text-gray-800 text-sm mt-2 truncate">
          {place.name}
        </h3>
        <div className="flex items-center mt-1">
          <FaStar className="text-yellow-500 text-xs" />
          <span className="text-xs font-medium ml-1">{place.rating}</span>
          <span className="text-xs text-gray-400 ml-1">
            ({place.num_reviews})
          </span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-600 font-medium">
            {place.price_level}
          </span>
          <button className="text-xs bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600 transition-colors">
            Details
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PlacePopup;
