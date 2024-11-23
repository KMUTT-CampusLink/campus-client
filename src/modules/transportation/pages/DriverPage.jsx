import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { fetchDriverTrips } from "../services/api";
import { format } from "date-fns";

const DriverPage = () => {
  const [driverTrips, setDriverTrips] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // Fetch driver's trips if they are authenticated
  useEffect(() => {
    if (userRole === "Driver") {
      fetchDriverTrips().then((data) => {
        setDriverTrips(data.trips);
      });
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
            Search for Routes also from router but different file
          </Link>
        </div>

        {userRole == null ? <></> : <p>Signed in as {userRole}</p>}
        {userRole === "Driver" ? (
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
            <p>Not signed in as a Driver</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverPage;
