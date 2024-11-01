import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";
import { fetchUserBookings, fetchTripData } from "../services/api";
import { format } from "date-fns";

const NavigationPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  console.log(userRole);

  useEffect(() => {
    fetchTripData(1).then((data) => {
      console.log(data);
    });
  });

  // testing authentication with signed in user, by fetching his bookings
  useEffect(() => {
    fetchUserBookings().then((data) => {
      setUserBookings(data.bookings);
      console.log(data.bookings);
    });
  }, []);

  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-7xl pt-20 pb-6 w-4/5 bg-orange-100">
        <h2 className="text-3xl">Navigation Page</h2>
        <ul>
          <li>
            <Link
              to="./home"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Search for routes
            </Link>
          </li>
        </ul>
        <br />
        {userRole == "Student" ? (
          <>
            <h2 className="text-2xl">My bookings</h2>
            {userBookings.map((booking, index) => (
              <div key={index}>
                {format(new Date(booking.trip.trip_date), "yyyy-MM-dd")} time:{" "}
                {format(
                  new Date(booking.trip.trip_schedule.start_time),
                  "HH:mm"
                )}
                {" - "}
                {format(new Date(booking.trip.trip_schedule.end_time), "HH:mm")}
              </div>
            ))}
          </>
        ) : (
          <h2>Not signed in as student to view bookings</h2>
        )}
      </div>
    </div>
  );
};

export default NavigationPage;
