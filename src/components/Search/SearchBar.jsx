import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";
import { searchLocations } from "@/services/mapboxService";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length > 2) {
        setLoading(true);
        const results = await searchLocations(debouncedQuery);
        setSuggestions(results);
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (place) => {
    setQuery(place.place_name);
    setSuggestions([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destination..."
          className="w-full pl-10 pr-10 py-3 rounded-lg shadow-lg border-0 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-200 text-gray-800"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-pink-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      <SearchSuggestions suggestions={suggestions} onSelect={handleSelect} />
    </div>
  );
};

SearchBar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SearchBar;
