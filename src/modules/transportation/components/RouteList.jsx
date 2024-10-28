import React from "react";

const RouteList = ({ routes }) => {
  return (
    <div className="w-full">
      {routes.length === 0 ? (
        <div className="text-3xl text-center text-gray-500">
          No routes available.
        </div>
      ) : (
        routes.map((route, index) => (
          <div
            key={index}
            value={route.id}
            className="bg-orange-100 shadow-lg rounded-lg p-6 w-full justify-between mb-4"
          >
            <h3 className="text-2xl font-bold mb-2">{route.name}</h3>
            <p className="text-gray-600 mb-4">{route.description}</p>

            <button className="mt-auto py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              View Schedule
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RouteList;
