import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import PlaceCard from "./PlaceCard";

const PlacesList = ({ places, selectedPlace, onPlaceSelect, loading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef()),
    );
  }, [places]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-lg h-24 animate-pulse flex gap-3"
          >
            <div className="w-24 bg-gray-200 rounded-md"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!places?.length) return null;

  return (
    <div className="space-y-1">
      {places.map((place, i) => (
        <PlaceCard
          key={place.location_id || i}
          place={place}
          selected={
            Number(place.location_id) === Number(selectedPlace?.location_id)
          }
          onClick={() => onPlaceSelect(place)}
          refProp={elRefs[i]}
        />
      ))}
    </div>
  );
};

PlacesList.propTypes = {
  places: PropTypes.array,
  selectedPlace: PropTypes.object,
  onPlaceSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

PlacesList.defaultProps = {
  places: [],
  selectedPlace: null,
};

export default PlacesList;
