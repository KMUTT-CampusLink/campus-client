import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";
import { useState } from "react";

// const routes = [
//   { id: 1, name: "Route 1", description: "" },
//   { id: 2, name: "Route 2", description: "" },
//   { id: 3, name: "Route 3", description: "" },
//   { id: 4, name: "Route 4", description: "" },
//   { id: 5, name: "Route 5", description: "" },
//];

const TestPage = () => {
  const [routes, setRoutes] = useState([]);
  const location = useLocation(); //locattion object contains information about the current URL, location.state is used to pass data between routes
  const state = location.state;
  console.log(state);
  useEffect(() => {
    const fetch = async () => {
      const data = await axiosInstance
        .post("transport/user/routesConnectingStops", {
          start_stop_id: state.start_stop_id,
          end_stop_id: state.end_stop_id,
        })
        .then((res) => res.data);
      console.log(data);
      setRoutes(data.routes);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-2xl font-bold mb-2">{route.name}</h3>
            <p className="text-gray-600 mb-4">{route.description}</p>
            
            <Link to='/transport/booking'><button className="mt-auto py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Choose
            </button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
