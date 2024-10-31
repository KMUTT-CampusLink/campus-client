import React from "react";

// Display a list of trips for a route, filtering of what trips are shown is yet to be done, ie those which already hapenned should not be shown
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
            {/* info about the trip, not pretty for now */}
            <div>
              <h1>Driver (only id for now) : {trip.driver_id}</h1>
              <h1>Vehicle (only id for now) : {trip.vehicle_id}</h1>
              <h1>start time: {trip.trip_schedule.start_time}</h1>
              <h1>start time: {trip.trip_schedule.start_time}</h1>
              <h1>end time: {trip.trip_schedule.end_time}</h1>
              <h1>date: {trip.trip_date}</h1>
              <h1>day of week: {trip.trip_schedule.day}</h1>
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
