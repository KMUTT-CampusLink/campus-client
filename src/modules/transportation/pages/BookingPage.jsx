import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchTripData } from "../services/api";

function BookingPage() {
  // State for booking details
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripData(1);
      const trip = tripData.trip;

      const bookingDetails = {
        startTime: format(new Date(trip.trip_schedule.start_time), "HH:mm"),
        endTime: format(new Date(trip.trip_schedule.end_time), "HH:mm"),
        date: format(new Date(trip.trip_date), "yyyy-MM-dd"),
        driverName: `${trip.driver.employee.firstname} ${trip.driver.employee.midname} ${trip.driver.employee.lastname}`,
        vehicleLicenseNumber: trip.vehicle.registration_no,
      };

      setBookingDetails(bookingDetails);
      console.log(bookingDetails);
    };

    fetchData();
  }, []);

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking confirmed, not handled yet");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Booking Form */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Your Booking
        </h1>

        {bookingDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(bookingDetails).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-md font-medium text-gray-700 mb-2">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <p className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 text-lg text-gray-700">
                  {value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-orange-600 text-lg font-semibold">
            Loading booking details...
          </p>
        )}

        {/* Confirm Booking Button */}
        {bookingDetails && (
          <div className="flex justify-center mt-6">
            <button
              // onClick={handleConfirmPage}
              className="w-full max-w-xs bg-orange-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-orange-600 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
