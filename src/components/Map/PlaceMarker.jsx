import React from "react";
import { Marker } from "react-map-gl/mapbox";
import { FaUtensils, FaHotel, FaMapMarkerAlt, FaCamera } from "react-icons/fa";

const PlaceMarker = ({ place, onClick }) => {
  if (!place.latitude || !place.longitude) return null;

  let Icon = FaMapMarkerAlt;
  // Simple heuristic or pass type
  if (place.category?.key === "restaurant") Icon = FaUtensils;
  else if (place.category?.key === "hotel") Icon = FaHotel;
  else if (place.category?.key === "attraction") Icon = FaCamera;

  return (
    <Marker
      longitude={Number(place.longitude)}
      latitude={Number(place.latitude)}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(place);
      }}
    >
      <div className="text-pink-500 hover:text-pink-700 cursor-pointer transform hover:scale-110 transition-transform bg-white rounded-full p-1 shadow-md border border-gray-200">
        <Icon className="text-lg" />
      </div>
    </Marker>
  );
};

export default PlaceMarker;
