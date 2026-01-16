import React from "react";
import { FaCar, FaWalking, FaBicycle } from "react-icons/fa";

const DirectionsPanel = ({ route, onClose }) => {
  if (!route) return null;

  const duration = Math.round(route.duration / 60);
  const distance = (route.distance / 1000).toFixed(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Route</h3>
        <div className="text-sm font-medium text-blue-600">
          {duration} min ({distance} km)
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center gap-3">
        <FaCar className="text-blue-500" />
        <span className="text-sm text-blue-800">
          Fastest route via {route.legs[0]?.summary}
        </span>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {route.legs[0]?.steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-3 text-sm text-gray-600 border-b border-gray-50 pb-2 last:border-0"
          >
            <span className="font-bold text-gray-400 w-4">{i + 1}.</span>
            <span>{step.maneuver.instruction}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
      >
        Clear Route
      </button>
    </div>
  );
};

export default DirectionsPanel;
