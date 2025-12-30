import React, { useState, useCallback, useEffect, useRef } from 'react';
import Map, { NavigationControl, GeolocateControl, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { DEFAULT_COORDINATES, MAP_STYLES } from '../../constants/mapConfig';
import PlaceMarker from './PlaceMarker';

const MapView = ({ activeLocation, onBoundsChange, places = [], onPlaceSelect }) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        if (activeLocation && mapRef.current) {
            mapRef.current.flyTo({
                center: [activeLocation.longitude, activeLocation.latitude],
                zoom: activeLocation.zoom || 13,
                essential: true
            });
        }
    }, [activeLocation]);

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
                ref={mapRef}
                initialViewState={DEFAULT_COORDINATES}
                style={{ width: '100%', height: '100%' }}
                mapStyle={MAP_STYLES.STREETS}
                mapboxAccessToken={token}
                onMoveEnd={onMoveEnd}
                onLoad={onLoad}
            >
                <NavigationControl position="bottom-right" />
                <GeolocateControl position="top-left" />

                {activeLocation && (
                    <Marker
                        longitude={activeLocation.longitude}
                        latitude={activeLocation.latitude}
                        anchor="bottom"
                    >
                        <FaMapMarkerAlt className="text-4xl text-red-600 drop-shadow-md" />
                    </Marker>
                )}

                {places?.map((place, i) => (
                    <PlaceMarker
                        key={place.location_id || i}
                        place={place}
                        onClick={onPlaceSelect}
                    />
                ))}
            </Map>
        </div>
    );
};

export default MapView;
