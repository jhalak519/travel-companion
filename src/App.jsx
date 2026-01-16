import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import { getPlacesData } from './services/rapidApiService';
import { getDirections } from './services/directionsService';

function App() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sortOption, setSortOption] = useState('rating');
  const [userLocation, setUserLocation] = useState(null); // Need user location for directions
  const [route, setRoute] = useState(null);

  // Attempt to get user location on mount (mimic GeolocateControl effect)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.longitude, pos.coords.latitude]);
      setActiveLocation({ longitude: pos.coords.longitude, latitude: pos.coords.latitude, zoom: 13 });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setLoading(true);
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      getPlacesData(type, { lat: sw.lat, lng: sw.lng }, { lat: ne.lat, lng: ne.lng })
        .then((data) => {
          const validPlaces = data?.filter(place => place.name && place.num_reviews > 0) || [];
          setPlaces(validPlaces);
          setLoading(false);
        });
    }
  }, [bounds, type]);

  useEffect(() => {
    let result = places.filter(place => Number(place.rating) >= rating);

    if (sortOption === 'rating') {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortOption === 'reviews') {
      result.sort((a, b) => Number(b.num_reviews) - Number(a.num_reviews));
    } else if (sortOption === 'ranking') {
      result.sort((a, b) => Number(a.ranking_position || 9999) - Number(b.ranking_position || 9999));
    }

    setFilteredPlaces(result);
  }, [rating, places, sortOption]);

  const handlePlaceSelect = (place) => {
    if (place.center) {
      setActiveLocation({
        longitude: place.center[0],
        latitude: place.center[1],
        zoom: 13
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
    setSortOption('rating');
    setSelectedPlace(null);
    setRoute(null);
  };

  const handleGetDirections = async () => {
    if (userLocation && selectedPlace) {
      const start = userLocation;
      const end = [Number(selectedPlace.longitude), Number(selectedPlace.latitude)];
      const routeData = await getDirections(start, end);
      setRoute(routeData);
    } else {
      alert('User location not found. Please enable location services.');
    }
  };

  return (
    <Layout>
      <div className="flex w-full h-full overflow-hidden relative">
        <Sidebar
          onPlaceSelect={handlePlaceSelect}
          places={filteredPlaces}
          loading={loading}
          selectedPlace={selectedPlace}
          onBack={() => { setSelectedPlace(null); setRoute(null); }}
          type={type}
          onTypeChange={handleTypeChange}
          rating={rating}
          onRatingChange={setRating}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onGetDirections={handleGetDirections} // Handle in PlaceDetailsModal (needs Update)
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
          />
          {loading && (
            <div className="absolute top-4 right-4 z-10 bg-white px-3 py-1 rounded shadow text-sm font-semibold text-blue-600">
              Finding places...
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
