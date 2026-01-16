import React from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-gray-400 text-xl" />
                <span className="text-sm font-medium text-gray-700">
                  {review.user?.username || "Traveler"}
                </span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-500 text-xs" />
                <span className="text-xs font-medium ml-1 text-gray-600">
                  {review.rating}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 italic">
              "{review.summary || review.text}"
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {review.published_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
