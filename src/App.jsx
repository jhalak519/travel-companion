import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import { getPlacesData } from './services/rapidApiService';

function App() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type] = useState('restaurants');
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  return (
    <Layout>
      <div className="flex w-full h-full overflow-hidden relative">
        <Sidebar
          onPlaceSelect={handlePlaceSelect}
          places={places}
        />
        <div className="flex-1 h-full relative">
          <MapView
            activeLocation={activeLocation}
            onBoundsChange={handleBoundsChange}
            places={places}
            onPlaceSelect={handlePlaceSelect}
            selectedPlace={selectedPlace}
            onPopupClose={() => setSelectedPlace(null)}
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
