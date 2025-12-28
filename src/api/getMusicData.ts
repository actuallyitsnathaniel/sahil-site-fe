import { prod_url, GET_options } from "./util";

const CACHE_KEY = "music-data";
const CACHE_TIMESTAMP_KEY = "music-data-timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getMusicPage = async () => {
  try {
    // Check localStorage cache first
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp, 10);

      // Return cached data if it's fresh (less than 24 hours old)
      if (age < CACHE_DURATION) {
        console.log("Using cached music data");
        return JSON.parse(cachedData);
      }
    }

    // Fetch fresh data if cache is missing or expired
    console.log("Fetching fresh music data from API");
    const response = await fetch(
      `${prod_url}/api/music-section?populate=musicTrack.audioTrack`,
      GET_options
    );

    const json = await response.json();
    const data = json.data;

    // Cache the data in localStorage
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

    return data;
  } catch (error) {
    console.error("Error fetching music data:", error);

    // Fallback to cached data even if expired, if network fails
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.log("Network error - using stale cached data as fallback");
      return JSON.parse(cachedData);
    }

    throw error;
  }
};
