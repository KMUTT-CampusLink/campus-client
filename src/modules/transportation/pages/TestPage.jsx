import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";

// const routes = [
//   { id: 1, name: "Route 1", description: "" },
//   { id: 2, name: "Route 2", description: "" },
//   { id: 3, name: "Route 3", description: "" },
//   { id: 4, name: "Route 4", description: "" },
//   { id: 5, name: "Route 5", description: "" },
// ];

const TestPage = () => {
  const [routes, setRoutes] = useState([]);
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const fetch = async () => {
      const data = await axiosInstance
        .post("transport/user/routesConnectingStops", {
          start_stop_id: parseInt(state?.start_stop_id || startStop),
          end_stop_id: parseInt(state?.end_stop_id || endStop),
        })
        .then((res) => res.data);
      console.log(data);
      setRoutes(data.routes);
    };
    if (state?.start_stop_id && state?.end_stop_id) fetch();
  }, [state, startStop, endStop]);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      {/* From and To Input Fields */}
      <div className="w-full max-w-2xl mb-6 flex justify-between gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="start">
            From Route:
          </label>
          <input
            type="text"
            id="start"
            value={startStop}
            onChange={(e) => setStartStop(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter start location"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="end">
            To Route:
          </label>
          <input
            type="text"
            id="end"
            value={endStop}
            onChange={(e) => setEndStop(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter destination"
          />
        </div>
      </div>

      {/* Routes Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-2xl font-bold mb-2">{route.name}</h3>
            <p className="text-gray-600 mb-4">{route.description}</p>

            <button className="mt-auto py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Choose
            </button>
          </div>
        ))}
      </div>

      {/* Map Box Placeholder */}
      <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <span className="text-gray-500">Map Box Placeholder</span>
      </div>

      {/* View Schedules Button */}
      <Link to="/transport/booking">
        <button className="py-2 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          View Schedules
        </button>
      </Link>
    </div>
  );
};

export default TestPage;
