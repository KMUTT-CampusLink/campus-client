import BookingPage from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import React, { useState, useEffect } from "react";
import TestPage from "../pages/TestPage";
import QRCodePage from "../pages/QRCodePage";
import DriverPage from "../pages/DriverPage";
import StudentPage from "../pages/StudentPage";
import NotSignedInPage from "../pages/NotSignedInPage";

export default function TransRoutes() {
  const userRole = localStorage.getItem("userRole");

  return [
    {
      path: "",
      element:
        userRole == "Driver" ? (
          <DriverPage />
        ) : userRole == "Student" ? (
          <StudentPage />
        ) : (
          <NotSignedInPage />
        ),
    },
    { path: "home", element: <HomePage /> },
    { path: "booking/:tripID", element: <BookingPage /> },
    { path: "test", element: <TestPage /> },
    { path: "QRCodePage", element: <QRCodePage /> },
  ];
}
