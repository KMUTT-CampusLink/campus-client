import BookingPage from "../pages/BookingPage";
import ConfirmBookingPage from "../pages/ConfirmBookingPage";
import HomePage from "../pages/HomePage";
import React, { useState, useEffect } from "react";
import TestPage from "../pages/TestPage";

export default function TransRoutes() {
  return [
    {
      path: "home",
      element: <HomePage />,
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
