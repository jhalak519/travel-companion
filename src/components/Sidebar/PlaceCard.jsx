import React from "react";
import PropTypes from "prop-types";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const PlaceCard = ({ place, selected, refProp, onClick }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      className={`bg-white p-3 rounded-lg shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 cursor-pointer flex gap-3 mb-3 border ${selected ? "border-pink-500 ring-1 ring-pink-500" : "border-transparent"}`}
      onClick={onClick}
    >
      <div className="w-24 h-24 flex-shrink-0">
        {place.photo ? (
          <img
            src={place.photo.images.small.url}
            alt={place.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs text-center p-1">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
            {place.name}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500 flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              {place.address_obj?.city || place.location_string || "Location"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs font-medium ml-1 text-gray-700">
              {place.rating}
            </span>
            <span className="text-xs text-gray-400 ml-1">
              ({place.num_reviews})
            </span>
          </div>
          <span className="text-xs font-medium text-gray-600">
            {place.price_level}
          </span>
        </div>

        <div className="flex gap-1 mt-2 overflow-hidden">
          {place.cuisine?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full whitespace-nowrap"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  refProp: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

PlaceCard.defaultProps = {
  selected: false,
};

export default PlaceCard;
