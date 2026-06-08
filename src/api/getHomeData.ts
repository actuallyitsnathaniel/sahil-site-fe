import { prod_url, GET_options } from "./util";

const CACHE_KEY = "home-data";
const CACHE_TIMESTAMP_KEY = "home-data-timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getHomePage = async () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cacheTimestamp) {
      const parsed = JSON.parse(cachedData);
      const age = Date.now() - parseInt(cacheTimestamp, 10);

      if (parsed !== null && age < CACHE_DURATION) {
        console.log("Using cached home data");
        return parsed;
      }
    }

    console.log("Fetching fresh home data from API");
    const response = await fetch(
      `${prod_url}/api/home-section?populate=collaborators.Logo`,
      GET_options
    );

    const json = await response.json();
    const data = json.data;

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);

    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.log("Network error - using stale cached data as fallback");
      return JSON.parse(cachedData);
    }

    throw error;
  }
};
