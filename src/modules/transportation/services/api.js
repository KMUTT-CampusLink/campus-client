import { axiosInstance } from "./axiosInstance";

// Centralized error handling
const handleApiError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error("API Error:", errorMessage);
  throw new Error(errorMessage);
};

// Generic GET request
const get = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Generic POST request
const post = async (url, payload) => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// API calls

export const fetchAllStops = () => get("/transport/user/queryAllStops");

/**
 * Fetches the route connecting two stops.
 *
 * @param {string} startStopID - The ID of the starting stop.
 * @param {string} endStopId - The ID of the ending stop.
 */
export const fetchRoutesConnectingStops = (startStopID, endStopId) =>
  get(`/transport/user/routesConnectingStops/${startStopID}/${endStopId}`);
