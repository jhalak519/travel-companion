import React from "react";

const RatingFilter = ({ rating, onRatingChange }) => {
  return (
    <div className="mt-4 px-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">
        <span>Minimum Rating</span>
        <span>{rating}+</span>
      </label>
      <input
        type="range"
        min="0"
        max="5"
        step="0.5"
        value={rating}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-blue-600"
      />
    </div>
  );
};

export default RatingFilter;
