import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";
import { fetchUserBookings } from "../services/api";

const NavigationPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [localStorageItems, setLocalStorageItems] = useState([]);

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

      <div className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        Navigation Page
        <ul>
          <li>
            <Link to="./home">Seach for routes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationPage;
