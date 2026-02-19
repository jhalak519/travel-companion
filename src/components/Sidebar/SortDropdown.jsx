import React from "react";
import PropTypes from "prop-types";

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className="mt-4 px-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
        Sort By
      </label>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="rating">Rating (High to Low)</option>
        <option value="reviews">Most Reviewed</option>
        <option value="ranking">Ranking</option>
      </select>
    </div>
  );
};

SortDropdown.propTypes = {
  sortOption: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortDropdown;
