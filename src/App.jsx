import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import MapView from './components/Map/MapView';
import SearchBar from './components/Search/SearchBar';

function App() {
  const [activeLocation, setActiveLocation] = useState(null);

  const handlePlaceSelect = (place) => {
    if (place.center) {
      setActiveLocation({
        longitude: place.center[0],
        latitude: place.center[1],
        zoom: 13 // Default zoom for search result
      });
    }
  };

  return (
    <Layout>
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
        <SearchBar onSelect={handlePlaceSelect} />
      </div>
      <div className="w-full h-full">
        <MapView activeLocation={activeLocation} />
      </div>
    </Layout>
  );
}

export default App;
