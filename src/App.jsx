import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import MapView from './components/Map/MapView';
import SearchBar from './components/Search/SearchBar';
import { getPlacesData } from './services/rapidApiService';

function App() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type] = useState('restaurants'); // Default type for now

  useEffect(() => {
    // Only fetch if we have bounds (and maybe after debounce, but simplified for now)
    if (bounds) {
      setLoading(true);
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      getPlacesData(type, { lat: sw.lat, lng: sw.lng }, { lat: ne.lat, lng: ne.lng })
        .then((data) => {
          // Basic filtering
          const validPlaces = data?.filter(place => place.name && place.num_reviews > 0) || [];
          setPlaces(validPlaces);
          setLoading(false);
          console.log("Fetched places:", validPlaces.length);
        });
    }
  }, [bounds, type]);

  const handlePlaceSelect = (place) => {
    if (place.center) {
      setActiveLocation({
        longitude: place.center[0],
        latitude: place.center[1],
        zoom: 13
      });
    }
  };

  const handleBoundsChange = (newBounds) => {
    setBounds(newBounds);
  };

  return (
    <Layout>
      <div className="absolute top-4 left-4 z-50 w-full max-w-sm">
        <SearchBar onSelect={handlePlaceSelect} />
      </div>
      <div className="w-full h-full relative">
        <MapView
          activeLocation={activeLocation}
          onBoundsChange={handleBoundsChange}
        />
        {loading && (
          <div className="absolute top-20 left-4 z-50 bg-white px-3 py-1 rounded shadow text-sm font-semibold text-blue-600">
            Finding places...
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
