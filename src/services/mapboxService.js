import axios from "axios";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export const searchLocations = async (query) => {
  if (!query) return [];
  if (!MAPBOX_TOKEN) {
    console.error("Mapbox token missing");
    return [];
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/${encodeURIComponent(query)}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          limit: 5,
          types: "place,locality,poi",
        },
      },
    );

    return response.data.features;
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};
