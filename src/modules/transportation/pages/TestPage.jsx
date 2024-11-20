import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchRoutesConnectingStops } from "../services/api";
import RouteList from "../components/RouteList";

// const routes = [
//   { id: 1, name: "Route 1", description: "" },
//   { id: 2, name: "Route 2", description: "" },
//   { id: 3, name: "Route 3", description: "" },
//   { id: 4, name: "Route 4", description: "" },
//   { id: 5, name: "Route 5", description: "" },
// ];

const TestPage = () => {
  const [routes, setRoutes] = useState([]);
  const location = useLocation();
  const state = location.state;
  const [startStop, endStop] = [state.startStop, state.endStop];
  console.log(startStop, endStop);

  useEffect(() => {
    if (state?.startStop.id && state?.endStop.id) {
      fetchRoutesConnectingStops(startStop.id, endStop.id).then((data) => {
        setRoutes(data.routes);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      {/* From and To Input Fields */}
      <div className="w-full max-w-2xl mb-6 flex justify-between gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="start">
            Start: {startStop.name}
          </label>
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="end">
            Destination: {state.endStop.name}
          </label>
        </div>
      </div>

      {/* Routes Display */}
      <RouteList routes={routes} />
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
