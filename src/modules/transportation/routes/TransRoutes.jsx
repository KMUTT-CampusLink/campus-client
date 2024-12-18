import BookingPage from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import QRCodePage from "../pages/QRCodePage";
import RedirectPage from "../pages/RedirectPage";
import TripScanPage from "../pages/TripScanPage";

export default function TransRoutes() {
  const userRole = localStorage.getItem("userRole");

  return [
    {
      path: "",
      element: <RedirectPage />,
    },
    { path: "home", element: <HomePage /> },
    { path: "booking/:tripID", element: <BookingPage /> },
    { path: "test", element: <TestPage /> },
    { path: "QRCodePage", element: <QRCodePage /> },
    { path: "trip", element: <TripScanPage /> },
  ];
}
