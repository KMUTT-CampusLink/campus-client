import React from "react";

const TripList = ({ trips }) => {
  return (
    <div className="w-full">
      {/* Show a message 'No routes available' if there are no routes */}
      {trips.length === 0 ? (
        <div className="text-3xl text-center text-gray-500">
          No active Trip for this route.
        </div>
      ) : (
        trips.map((trip, index) => (
          // Show a panel for each route
          <div
            key={index}
            value={trip.id}
            className="flex flex-row bg-orange-100 shadow-lg rounded-lg p-6 w-full justify-between mb-4"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {trip.trip_schedule.start_time}
              </h3>
              <h3 className="text-2xl font-bold mb-2">
                {trip.trip_schedule.end_time}
              </h3>
              {/* Button, eventually link to booking confirmation */}
              <button className="mt-auto py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                Book
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripList;
