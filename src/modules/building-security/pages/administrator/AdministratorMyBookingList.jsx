import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingData from "./booking_list.json";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";

export default function AdministratorMyBookingList() {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    setBookings(bookingData.bookings);
  }, []);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleConfirmDelete = () => {
    setBookings(bookings.filter((b) => b !== selectedBooking));
    handleCloseDialog();
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <CenteredBox>
        <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
          <button
            className="absolute top-4 right-4 text-primary bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => navigate("/security/administrator/mybooking")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#864E41]" // Apply custom color
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          {/* Move heading and description below the button */}
          <h1 className="absolute top-5 text-2xl font-bold mb-1">My Booking List</h1>
          <p className="absolute top-12 text-sm">List of all your bookings</p>
          <hr className="w-full my-3" />

          {/* Table Headers */}
          <div className="flex justify-between w-full p-3 bg-gray-100 rounded-lg mb-2 font-bold">
            <span className="flex-1">Room</span>
            <span className="flex-1">Date</span>
            <span className="flex-1">Time</span>
            <span className="w-10"></span>
          </div>

          {/* Table Content */}
          <div className="w-full max-h-96 overflow-y-auto">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow"
                >
                  <span className="flex-1">{booking.room}</span>
                  <span className="flex-1">{booking.date}</span>
                  <span className="flex-1">{booking.time}</span>
                  <button
                    onClick={() => handleDeleteClick(booking)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p>No bookings available</p>
            )}
          </div>
        </div>
      </CenteredBox>

      {/* Dialog for confirming deletion */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
            <div className="mb-4">
              {selectedBooking && (
                <>
                  <div className="flex justify-between bg-gray-100 p-3 rounded-lg mb-4">
                    <span className="flex-1">{selectedBooking.room}</span>
                    <span className="flex-1">{selectedBooking.date}</span>
                    <span className="flex-1">{selectedBooking.time}</span>
                  </div>
                  <p className="font-bold">
                    Are you sure you want to cancel this booking?
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-center space-x-3">
              <button onClick={handleConfirmDelete} className="btn btn-error">
                Confirm
              </button>
              <button onClick={handleCloseDialog} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
