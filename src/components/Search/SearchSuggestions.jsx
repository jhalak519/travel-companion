import React from "react";

const SearchSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50">
      {suggestions.map((place) => (
        <li
          key={place.id}
          onClick={() => onSelect(place)}
          className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex flex-col border-b border-gray-50 last:border-0"
        >
          <span className="font-medium text-gray-800 text-sm">
            {place.text}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {place.place_name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
