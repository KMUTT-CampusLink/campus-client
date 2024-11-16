import React from "react";

const RouteList = ({ routes, selectedRoute, setSelectedRoute }) => {
  function handleRouteSelection(routeID) {
    const route = routes.find((route) => route.id == routeID);
    setSelectedRoute(route);
  }

  return (
    <div className="w-full font-geologica">
      {routes.length === 0 ? (
        <div className="text-xl text-center text-gray-500">
          No routes available.
        </div>
      ) : (
        routes.map((route, index) => (
          <div
            key={index}
            value={route.id}
            className="flex flex-col bg-gray-200 shadow-lg rounded-lg p-4 w-full justify-between mb-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold">{route.name}</h3>
              <button
                className="py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                onClick={() => handleRouteSelection(route.id)}
              >
                View Schedule
              </button>
            </div>

            <div className="flex flex-row items-center mt-4">
              {route.connection.map((connection, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-orange-300 text-black px-2 py-1 rounded-md">
                    {connection.stop_connection_start_idTostop.name}
                  </span>
                  {index < route.connection.length && (
                    <span className="mx-3 text-lg font-semibold">→ 8:30PM</span>
                  )}
                </div>
              ))}
              <span className="bg-orange-300 text-black px-2 py-1 rounded-md">
                {
                  route.connection[route.connection.length - 1]
                    .stop_connection_end_idTostop.name
                }
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RouteList;
