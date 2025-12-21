import React, { useState, useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DEFAULT_COORDINATES, MAP_STYLES } from '../../constants/mapConfig';

const MapView = ({ onBoundsChange }) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // We can use uncontrolled map but listen to events
    const onMove = useCallback((evt) => {
        // We can expose viewState or bounds here
        // For now, we prefer onMoveEnd for bounds updates to avoid API spam
    }, []);

    const onMoveEnd = useCallback((evt) => {
        if (onBoundsChange) {
            const bounds = evt.target.getBounds();
            onBoundsChange(bounds);
        }
    }, [onBoundsChange]);

    const onLoad = useCallback(() => {
        setIsMapLoaded(true);
    }, []);

    if (!token) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500 font-bold">
                Mapbox token is missing!
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            {!isMapLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm">
                    <span className="text-blue-600 font-medium animate-pulse">Loading Map...</span>
                </div>
            )}
            <Map
                initialViewState={DEFAULT_COORDINATES}
                style={{ width: '100%', height: '100%' }}
                mapStyle={MAP_STYLES.STREETS}
                mapboxAccessToken={token}
                onMove={onMove}
                onMoveEnd={onMoveEnd}
                onLoad={onLoad}
            >
                <NavigationControl position="bottom-right" />
                <GeolocateControl position="top-left" />
            </Map>
        </div>
    );
};

export default MapView;
