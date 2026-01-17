import React from "react";

const RatingFilter = ({ rating, onRatingChange }) => {
  return (
    <div className="mt-4 px-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
        Rating
      </label>
      <select
        value={rating}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value={0}>Any</option>
        <option value={1}>1.0+</option>
        <option value={2}>2.0+</option>
        <option value={3}>3.0+</option>
        <option value={4}>4.0+</option>
        <option value={5}>5.0</option>
      </select>
    </div>
  );
};

export default RatingFilter;
