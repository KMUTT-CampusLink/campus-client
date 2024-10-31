import React from "react";

const RouteList = ({ routes, selectedRoute, setSelectedRoute }) => {
  function handleRouteSelection(routeID) {
    const route = routes.find((route) => route.id == routeID);
    setSelectedRoute(route);
  }

  return (
    <div className="w-full">
      {/* Show a message 'No routes available' if there are no routes */}
      {routes.length === 0 ? (
        <div className="text-3xl text-center text-gray-500">
          No routes available.
        </div>
      ) : (
        routes.map((route, index) => (
          // Show a panel for each route
          <div
            key={index}
            value={route.id}
            className="flex flex-row bg-orange-100 shadow-lg rounded-lg p-6 w-full justify-between mb-4"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{route.name}</h3>

              {/* Button to show the route's schedule */}
              <button
                className="mt-auto py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                onClick={() => handleRouteSelection(route.id)}
              >
                View Schedule
              </button>
            </div>

            {/* Show the stops the route goes through in order */}
            <div className="flex flex-row items-center overflow-x-auto">
              {route.connection.map((connection, index) => (
                <div key={index} className="bg-orange-200">
                  {connection.stop_connection_start_idTostop.name} ={">"}{" "}
                </div>
              ))}
              <div className="bg-orange-200">
                {
                  route.connection[route.connection.length - 1]
                    .stop_connection_end_idTostop.name
                }{" "}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RouteList;
