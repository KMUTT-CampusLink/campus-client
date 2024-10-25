import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUserCircle,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="hidden min-[900px]:block text-white bg-gradient-to-r from-[#c2544d] to-[#f09107] h-16 w-full shadow-lg mb-10">
        <div className="flex items-center text-white ml-4">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-2xl" />
          </Link>
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
        </div>
      </header>

      <div className="flex container mx-auto px-4">
        {/* New Schedule Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <div className="space-y-6">
            {/* Example Schedule Box 1 */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faBus}
                className="text-orange-600 text-3xl mr-4"
              />
              <div>
                <h3 className="font-bold text-orange-600">
                  Bangmod - Bang Khun Tien (Bus)
                </h3>
                <p className="text-gray-700">Date: 2024-10-25</p>
                <p className="text-gray-700">Departure: 08:30 AM</p>
                <p className="text-gray-700">Arrival: 09:15 AM</p>
              </div>
            </div>

            {/* Example Schedule Box 2 */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faBus}
                className="text-orange-600 text-3xl mr-4"
              />
              <div>
                <h3 className="font-bold text-orange-600">
                  Bang Khun Tien - Bangmod (Bus)
                </h3>
                <p className="text-gray-700">Date: 2024-10-25</p>
                <p className="text-gray-700">Departure: 10:00 AM</p>
                <p className="text-gray-700">Arrival: 10:45 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Book Your Ride</h2>

            {/* Grouped Date, Time, From, To Fields in the Same Box */}
            <div className="bg-gray-100 p-6 rounded-md space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">From</span>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter starting location"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">To</span>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter destination"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Date</span>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Time</span>
                <input
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mt-5">
            <Link to="/transport/confirm">
              <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
                BOOK NOW!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
