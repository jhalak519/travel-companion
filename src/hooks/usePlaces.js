import { useState, useEffect } from "react";
import { getPlacesData } from "@/services/rapidApiService";

/**
 * Encapsulates geolocation detection, place fetching, filtering, and sorting.
 *
 * @param {object|null} bounds  - Mapbox LngLatBounds object from MapView
 * @param {string}      type    - Place category ("restaurants" | "hotels" | "attractions")
 * @param {number}      rating  - Minimum rating filter (0–5)
 * @param {string}      sortOption - Sort key ("rating" | "reviews" | "ranking")
 * @returns {{ places, loading, userLocation, setUserLocation }}
 */
export default function usePlaces(bounds, type, rating, sortOption) {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    // Detect user location once on mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation([pos.coords.longitude, pos.coords.latitude]);
        });
    }, []);

    // Fetch places whenever bounds or type changes
    useEffect(() => {
        if (!bounds) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        getPlacesData(
            type,
            { lat: sw.lat, lng: sw.lng },
            { lat: ne.lat, lng: ne.lng },
        ).then((data) => {
            const validPlaces =
                data?.filter((place) => place.name && place.num_reviews > 0) || [];
            setPlaces(validPlaces);
            setLoading(false);
        });
    }, [bounds, type]);

    // Filter and sort locally whenever dependencies change
    useEffect(() => {
        let result = places.filter((place) => Number(place.rating) >= rating);

        if (sortOption === "rating") {
            result.sort((a, b) => Number(b.rating) - Number(a.rating));
        } else if (sortOption === "reviews") {
            result.sort((a, b) => Number(b.num_reviews) - Number(a.num_reviews));
        } else if (sortOption === "ranking") {
            result.sort(
                (a, b) =>
                    Number(a.ranking_position || 9999) -
                    Number(b.ranking_position || 9999),
            );
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilteredPlaces(result);
    }, [rating, places, sortOption]);

    return { filteredPlaces, loading, userLocation, setUserLocation };
}
