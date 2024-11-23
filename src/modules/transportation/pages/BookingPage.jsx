import React, { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { fetchTripData, bookTrip, isBooked } from "../services/api";
import { useParams } from "react-router-dom";
import QRCodePage from "./QRCodePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../registration/components/NavBarComponents/NavBar";

function BookingPage() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const { tripID } = useParams(); // Extract tripID from URL parameters
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripData(tripID); // Use tripID from URL parameters
      const trip = tripData.trip;
      await isBooked(tripID).then((res) => {
        if (res.booking) {
          setBooking(res.booking);
          setIsConfirmed(true);
        }
      });
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
    <div className="w-full h-screen font-geologica">
      <NavBar />
      <div className="flex flex-col items-center justify-center bg-gray-100 pt-[4.5rem]">
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
                        {key.slice(0, 1).toUpperCase() +
                          key
                            .slice(1)
                            .split(/(?=[A-Z])/)
                            .join(" ")}
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
                    <FontAwesomeIcon
                      className="text-green-500 w-[2.5rem] h-[2.5rem]"
                      icon={faSquareCheck}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-green-700">
                    Booking Confirmed!
                  </h2>
                  {booking && (
                    <div className="mt-4 flex flex-col items-center">
                      <QRCodePage
                        tripID={booking.trip_id}
                        userID={booking.user_id}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
