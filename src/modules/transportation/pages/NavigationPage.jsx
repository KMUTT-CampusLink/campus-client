import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";
import { fetchUserBookings, fetchTripData } from "../services/api";
import { format } from "date-fns";

const NavigationPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    fetchTripData(1).then((data) => {
      console.log(data);
    });
  });

  // Fetch user's bookings if they are authenticated
  useEffect(() => {
    fetchUserBookings().then((data) => {
      setUserBookings(data.bookings);
      console.log(data.bookings);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <NavBar />

      <div className="mx-auto max-w-4xl pt-20 pb-10 px-4 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Navigation Page
        </h2>

        <div className="mb-6">
          <Link
            to="./home"
            className="text-lg text-blue-600 underline hover:text-blue-800"
          >
            Search for routes
          </Link>
        </div>

        {userRole === "Student" ? (
          <>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              My Bookings
            </h2>

            <div className="space-y-4">
              {userBookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-orange-500"
                >
                  <p className="text-xl font-medium text-gray-900">
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
        ) : (
          <div className="text-center text-xl text-gray-700 mt-6">
            <p>Not signed in as a student to view bookings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationPage;
