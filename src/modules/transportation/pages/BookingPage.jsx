import React, { useEffect, useState } from "react";

function BookingPage() {
  // State for booking details
  const [bookingDetails, setBookingDetails] = useState(null);

  // Simulated fetch from backend
  useEffect(() => {
    // Simulate an API call to fetch booking details
    const fetchBookingDetails = async () => {
      // Mock data to simulate backend response
      const data = {
        driverId: "",
        vehicleId: "",
        startTime: "",
        endTime: "",
        date: "",
        dayOfWeek: "",
      };
      // Simulate a delay for fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookingDetails(data);
    };

    fetchBookingDetails();
  }, []);

  const handleBooking = () => {
    // Handle booking logic here
    if (bookingDetails) {
      alert(
        `Booking confirmed for Driver ID: ${bookingDetails.driverId}, Vehicle ID: ${bookingDetails.vehicleId} on ${bookingDetails.date} (${bookingDetails.dayOfWeek}) from ${bookingDetails.startTime} to ${bookingDetails.endTime}`
      );
    }
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
