import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";
import { fetchUserBookings, fetchDriverTrips } from "../services/api";
import { format } from "date-fns";

const NavigationPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [driverTrips, setDriverTrips] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  console.log(driverTrips);

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
          console.log(data.bookings);
        });
        break;
      default:
        break;
    }
  }, [userRole]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <NavBar />

      <div className="mx-auto max-w-4xl pt-20 pb-10 px-4 lg:px-8">
        {/* Dashboard Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-orange-300 pb-4">
          Dashboard
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
        {userRole ? <p>signed in as {userRole}</p> : <p>not signed in</p>}
        {userRole === "Student" ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              My Bookings
            </h3>

            <div className="space-y-4">
              {userBookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-4 border-l-4 border-orange-400"
                >
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
              ))}
            </div>
          </>
        ) : userRole === "Driver" ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              My Trips
            </h3>

            <div className="space-y-4">
              {driverTrips.map((trip, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-4 border-l-4 border-orange-400"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    {format(new Date(trip.trip_date), "yyyy-MM-dd")}
                  </p>
                  <p className="text-gray-600">
                    Time:{" "}
                    {format(new Date(trip.trip_schedule.start_time), "HH:mm")} -{" "}
                    {format(new Date(trip.trip_schedule.end_time), "HH:mm")}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-lg text-gray-700 mt-6">
            <p>Not signed in</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationPage;
