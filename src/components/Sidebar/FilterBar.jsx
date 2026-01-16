import React from "react";
import { PLACE_TYPES } from "../../constants/placeTypes";

const FilterBar = ({ type, onTypeChange }) => {
  return (
    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
      {[
        { label: "Restaurants", value: PLACE_TYPES.RESTAURANTS },
        { label: "Hotels", value: PLACE_TYPES.HOTELS },
        { label: "Attractions", value: PLACE_TYPES.ATTRACTIONS },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onTypeChange(option.value)}
          className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors border ${
            type === option.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
