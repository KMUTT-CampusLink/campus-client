import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import {
  fetchUserBookings,
  fetchDriverTrips,
  deleteBooking,
} from "../services/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [driverTrips, setDriverTrips] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const navigate = useNavigate();

  const handleBookingClick = (trip_id) => {
    navigate(`/transport/booking/${trip_id}`);
  };

  const handleDeleteBookingClick = (bookingID) => {};

  // Fetch user's bookings if they are authenticated
  useEffect(() => {
    switch (userRole) {
      case "Driver":
        fetchDriverTrips().then((data) => {
          setDriverTrips(data.trips);
        });
        break;
      case "Student":
        fetchUserBookings().then((data) => {
          setUserBookings(data.bookings);
        });
        break;
      default:
        break;
    }
  }, [userRole]);

  return (
    <div className="min-h-screen bg-white font-geologica">
      <NavBar />
      <div className="mx-auto max-w-4xl pt-20 pb-10 px-4 lg:px-8">
        {/* Dashboard Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-orange-300 pb-4">
          Shuttle buss transport service
        </h2>

        {/* Search for Routes Link */}
        <div className="mb-10 text-center">
          <Link
            to="./home"
            className="text-lg font-medium text-blue-500 underline hover:text-blue-600 transition duration-200"
          >
            Search for Routes
          </Link>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          My Bookings
        </h3>

        <div className="space-y-4">
          {userBookings.map((booking, index) => (
            <div
              key={index}
              className="flex bg-white shadow-md rounded-md p-4 border-l-4 border-orange-400"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {format(new Date(booking.trip.trip_date), "yyyy-MM-dd")}
                </p>
                <p className="text-gray-600">
                  Time:{" "}
                  {format(
                    new Date(booking.trip.trip_schedule.start_time),
                    "HH:mm"
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(booking.trip.trip_schedule.end_time),
                    "HH:mm"
                  )}
                </p>
              </div>
              <div>
                <button onClick={() => handleDeleteBookingClick(booking.id)}>
                  cancel Booking
                </button>
              </div>
              <div>
                <button onClick={() => handleBookingClick(booking.trip_id)}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
