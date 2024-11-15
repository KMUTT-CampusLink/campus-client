import BookingPage from "../pages/BookingPage";
import ConfirmBookingPage from "../pages/ConfirmBookingPage";
import HomePage from "../pages/HomePage";
import React, { useState, useEffect } from "react";
import TestPage from "../pages/TestPage";
import NavigationPage from "../pages/NavigationPage";
import QRCodePage from "../pages/QRCodePage";

export default function TransRoutes() {
  return [
    { path: "", element: <NavigationPage /> },
    { path: "home", element: <HomePage /> },
    { path: "booking/:tripID", element: <BookingPage /> },
    { path: "confirm", element: <ConfirmBookingPage /> },
    { path: "test", element: <TestPage /> },
    {path : "QRCodePage" , element: <QRCodePage/>},
  ];
}
