import { axiosInstance } from "../../../utils/axiosInstance.js";

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

export const fetchUserBookings = () => get("/transport/user/bookings");

export const fetchAllStops = () => get("/transport/user/queryAllStops");

/**
 * Fetches the route connecting two stops.
 *
 * @param {int} startStopID - The ID of the starting stop.
 * @param {int} endStopId - The ID of the ending stop.
 */
export const fetchRoutesConnectingStops = (startStopID, endStopId) =>
  get(`/transport/user/routesConnectingStops/${startStopID}/${endStopId}`);

/**
 * Fetches the trips for a route together with the routes schedule.
 * Returns JSON: { trips: [{ id, driver_id, trip_schedule_id, vehicle_id, trip_date, trip_schedule:{ id, route_id, day, start_time, end_time, status}}]
 * @param {int} routeID - The ID of the route
 * @example
 * example return value:
 * {
 *   "trips": [
 *     {
 *       "id": 1,
 *       "driver_id": 1,
 *       "trip_schedule_id": 1,
 *       "vehicle_id": 1,
 *       "trip_date": "2024-10-31T00:00:00.000Z",
 *       "trip_schedule": {
 *         "id": 1,
 *         "route_id": 1,
 *         "day": "Monday",
 *         "start_time": "1970-01-01T02:00:00.000Z",
 *         "end_time": "1970-01-01T03:00:00.000Z",
 *         "status": true,
 *       }
 *     },
 *   ]
 * }
 */
export const fetchTripsByRouteID = (routeID) =>
  get(`/transport/user/tripsByRouteID/${routeID}`);
