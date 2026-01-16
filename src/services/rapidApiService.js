import axios from "axios";
import { RAPIDAPI_BASE_URL, RAPIDAPI_HOST } from "../constants/config";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const getPlacesData = async (type, sw, ne) => {
  if (!API_KEY) {
    console.warn("RapidAPI Key missing");
    return [];
  }

  try {
    const {
      data: { data },
    } = await axios.get(`${RAPIDAPI_BASE_URL}/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    });

    return data;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    return [];
  }
};
