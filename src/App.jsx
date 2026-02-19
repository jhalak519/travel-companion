import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import MapView from "@/components/Map/MapView";
import Sidebar from "@/components/Sidebar/Sidebar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { getDirections } from "@/services/directionsService";
import usePlaces from "@/hooks/usePlaces";

function App() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sortOption, setSortOption] = useState("rating");
  const [route, setRoute] = useState(null);

  const { filteredPlaces, loading, userLocation, setUserLocation } = usePlaces(
    bounds,
    type,
    rating,
    sortOption,
  );

  // Sync user location from the map's geolocate control to our hook
  const handleUserLocationChange = (lngLat) => {
    setUserLocation(lngLat);
    setActiveLocation({ longitude: lngLat[0], latitude: lngLat[1], zoom: 13 });
  };

  const handlePlaceSelect = (place) => {
    if (place.center) {
      setActiveLocation({
        longitude: place.center[0],
        latitude: place.center[1],
        zoom: 13,
      });
      setSelectedPlace(null);
    } else {
      setSelectedPlace(place);
    }
  };

  const handleBoundsChange = (newBounds) => {
    setBounds(newBounds);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setRating(0);
    setSortOption("rating");
    setSelectedPlace(null);
    setRoute(null);
  };

  const handleGetDirections = async () => {
    if (userLocation && selectedPlace) {
      const end = [
        Number(selectedPlace.longitude),
        Number(selectedPlace.latitude),
      ];
      const routeData = await getDirections(userLocation, end);
      setRoute(routeData);
    } else {
      alert("User location not found. Please enable location services.");
    }
  };

  return (
    <FavoritesProvider>
      <Layout>
        <div className="flex w-full h-full overflow-hidden relative">
          <Sidebar
            onPlaceSelect={handlePlaceSelect}
            places={filteredPlaces}
            loading={loading}
            selectedPlace={selectedPlace}
            onBack={() => {
              setSelectedPlace(null);
              setRoute(null);
            }}
            type={type}
            onTypeChange={handleTypeChange}
            rating={rating}
            onRatingChange={setRating}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onGetDirections={handleGetDirections}
            route={route}
            onClearRoute={() => setRoute(null)}
          />
          <div className="flex-1 h-full relative">
            <MapView
              activeLocation={activeLocation}
              onBoundsChange={handleBoundsChange}
              places={filteredPlaces}
              onPlaceSelect={handlePlaceSelect}
              selectedPlace={selectedPlace}
              onPopupClose={() => setSelectedPlace(null)}
              route={route}
              onUserLocationChange={handleUserLocationChange}
            />
            {loading && (
              <div className="absolute top-4 right-4 z-10 bg-white px-3 py-1 rounded shadow text-sm font-semibold text-pink-500">
                Finding places...
              </div>
            )}
          </div>
        </div>
      </Layout>
    </FavoritesProvider>
  );
}

export default App;
