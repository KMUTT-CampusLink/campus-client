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
    fetchDriverTrips().then((data) => {
      setDriverTrips(data.trips);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-geologica">
      <NavBar />
      <div className="mx-auto max-w-4xl pt-20 pb-10 px-4 lg:px-8">
        {/* Dashboard Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-orange-300 pb-4">
          Campuslink Transport Service, Hello Driver
        </h2>

        {/* Trip Scan Button */}
        <div className="mb-6 flex justify-center">
          <Link
            to="/transport/trip"
            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-orange-600 transition"
          >
            Scan Trip
          </Link>
        </div>

        {/* My Trips Section */}
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
      </div>
    </div>
  );
};

export default DriverPage;