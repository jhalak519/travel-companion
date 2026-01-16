import axios from 'axios';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';

export const getDirections = async (start, end, profile = 'driving') => {
    if (!start || !end || !MAPBOX_TOKEN) return null;

    try {
        const response = await axios.get(
            `${BASE_URL}/${profile}/${start[0]},${start[1]};${end[0]},${end[1]}`,
            {
                params: {
                    access_token: MAPBOX_TOKEN,
                    geometries: 'geojson',
                    steps: true
                }
            }
        );

        return response.data.routes[0];
    } catch (error) {
        console.error('Error fetching directions:', error);
        return null;
    }
};
