import React from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DEFAULT_COORDINATES, MAP_STYLES } from '../../constants/mapConfig';

const MapView = () => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!token) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500 font-bold">
                Mapbox token is missing!
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <Map
                initialViewState={DEFAULT_COORDINATES}
                style={{ width: '100%', height: '100%' }}
                mapStyle={MAP_STYLES.STREETS}
                mapboxAccessToken={token}
            >
                <NavigationControl position="bottom-right" />
                <GeolocateControl position="top-left" />
            </Map>
        </div>
    );
};

export default MapView;
