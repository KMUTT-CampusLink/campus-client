import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";

export default function AdministratorMyBookingList() {
  const [booked, setBooked] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/security/getBooked"
        );
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBooked(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooked();
  }, []);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/security/bookings/${selectedBooking.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete booking");
      }

      // Remove the deleted booking from the state
      setBooked(booked.filter((b) => b.id !== selectedBooking.id));
      console.log(
        `Booking with ID ${selectedBooking.id} deleted successfully.`
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    } finally {
      handleCloseDialog();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <CenteredBox>
        <div className="relative flex flex-col items-center w-full h-full p-6">
          <br />
          <br />
          <button
            className="absolute p-2 bg-white rounded-full shadow top-4 right-4 text-primary hover:bg-gray-100"
            onClick={() => navigate("/security/administrator/mybooking")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#864E41]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <h1 className="absolute mb-1 text-2xl font-bold top-5">
            Booking List
          </h1>
          <p className="absolute text-sm top-12">List of all bookings</p>
          <hr className="w-full my-3" />

          {/* Table Headers */}
          <div className="flex justify-between w-full p-3 mb-2 font-bold bg-gray-100 rounded-lg">
            <span className="flex-1">Room</span>
            <span className="flex-1">Date</span>
            <span className="flex-1">Time</span>
            <span className="w-10"></span>
          </div>

          {/* Table Content */}
          <div className="w-full overflow-y-auto max-h-96">
            {booked.length > 0 ? (
              booked.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow"
                >
                  <span className="flex-1">
                    {booking.room?.name || "Unknown"}
                  </span>
                  <span className="flex-1">
                    {new Date(booking.booking_date).toISOString().split("T")[0]}
                  </span>
                  <span className="flex-1">
                    {`${new Date(
                      new Date(booking.start_time).getTime() -
                        7 * 60 * 60 * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} to ${new Date(
                      new Date(booking.end_time).getTime() - 7 * 60 * 60 * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </span>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              {selectedBooking && (
                <>
                  <div className="flex justify-between p-3 mb-4 bg-gray-100 rounded-lg">
                    <span className="flex-1">
                      Room: {selectedBooking.room?.name || "Unknown"}
                    </span>
                    <span className="flex-1">
                      {
                        new Date(selectedBooking.booking_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </span>
                    <span className="flex-1">
                      {`${new Date(
                        selectedBooking.start_time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} to ${new Date(
                        selectedBooking.end_time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </span>
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
