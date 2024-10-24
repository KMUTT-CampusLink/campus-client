import BookingPage from "../pages/BookingPage";
import ConfirmBookingPage from "../pages/ConfirmBookingPage";
import HomePage from "../pages/HomePage";
import React, { useState, useEffect } from "react";
import TestPage from "../pages/TestPage";

function BookingsComponent() {
  // Step 2: State Management
  const [bookings, setBookings] = useState([]);

  // Step 3: Side Effects
  useEffect(() => {
    // Step 4: Fetching Data
    async function fetchBookings() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/transport/driver/tripBookings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ trip_id: 1 }), // Replace with actual trip_id
          }
        );
        const data = await response.json();
        setBookings(data.bookings); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once when the component mounts

  // Step 5: Rendering
  return (
    <div>
      <h1>Bookings for drive</h1>
      {console.log(bookings)}
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {index}: {booking.id}/{booking.user_id}
          </li> // Adjust according to your booking object structure
        ))}
      </ul>
    </div>
  );
}

export default function TransRoutes() {
  return [
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "",
      element: <BookingsComponent />,
    },
    {
      path: "booking",
      element: <BookingPage />,
    },

    {
      path: "confirm",
      element: <ConfirmBookingPage />,
    },

    {
      path: "test",
      element: <TestPage />,
    },
  ];
}
