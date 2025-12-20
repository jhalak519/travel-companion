import React from 'react';
import Layout from './components/Layout/Layout';
import MapView from './components/Map/MapView';

function App() {
  return (
    <Layout>
      <div className="w-full h-full">
        <MapView />
      </div>
    </Layout>
  );
}

export default App;
