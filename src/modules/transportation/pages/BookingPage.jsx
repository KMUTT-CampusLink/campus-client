import React, { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { fetchTripData, bookTrip, isBooked } from "../services/api";
import { useParams } from "react-router-dom";

function BookingPage() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const { tripID } = useParams(); // Extract tripID from URL parameters
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripData(tripID); // Use tripID from URL parameters
      const trip = tripData.trip;
      const isBookedResponse = await isBooked(tripID);
      if (isBookedResponse.isBooked) {
        setIsConfirmed(true);
      }

      const bookingDetails = {
        startTime: format(new Date(trip.trip_schedule.start_time), "HH:mm"),
        endTime: format(new Date(trip.trip_schedule.end_time), "HH:mm"),
        date: format(new Date(trip.trip_date), "yyyy-MM-dd"),
        driverName: `${trip.driver.employee.firstname} ${trip.driver.employee.midname} ${trip.driver.employee.lastname}`,
        vehicleLicenseNumber: trip.vehicle.registration_no,
      };

      setBookingDetails(bookingDetails);
      setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, [tripID]);

  const handleBooking = () => {
    bookTrip(tripID)
      .then((res) => {
        if (res.status === 200) {
          console.log("Trip booked successfully");
          setIsConfirmed(true);
        } else {
          console.error("Failed to book trip");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Your Booking
        </h1>

        {isLoading ? (
          <p className="text-center text-orange-600 text-lg font-semibold">
            Loading booking details...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bookingDetails &&
                Object.entries(bookingDetails).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-md font-medium text-gray-700 mb-2">
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " ")}
                    </label>
                    <p className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-100 text-lg text-gray-700">
                      {value}
                    </p>
                  </div>
                ))}
            </div>

            {!isConfirmed && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleBooking}
                  className="w-full max-w-xs bg-orange-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-orange-600 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {isConfirmed && (
              <div className="mt-6 p-4 border border-green-500 bg-green-100 rounded-md text-center shadow-md">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-16 h-16 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15l-3-3 1.41-1.41L10 12.17l6.59-6.59L18 7l-8 8z" />
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-green-700">
                  Booking Confirmed!
                </h2>
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-md text-gray-600">Your QR Code:</p>
                  <div className="w-26 h-26 border border-gray-300 rounded-md flex items-center justify-center bg-white shadow">
                    <span className="text-gray-400">[Generate Qr]</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default BookingPage;
