import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-400 to-orange-600 flex justify-between items-center h-16 w-full shadow-lg mb-6">
        <div className="flex items-center text-white ml-4">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-2xl" /> {/* Back Icon */}
          <h1 className="text-2xl font-bold">See Schedule and Confirm Booking</h1>
        </div>
        <FontAwesomeIcon icon={faUserCircle} className="text-white text-2xl mr-4" />
      </header>

      <div className="flex container mx-auto px-4">
        {/* New Schedule Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Each schedule card */}
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Bangmod - Bang Khun Tien (Bus)</h3>
              <p>Weekdays</p>
              <p>08:30, 12:00, 16:00</p>
              <p>Weekends</p>
              <p>08:30, 12:00, 16:00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Bang Khun Tien - Bangmod (Bus)</h3>
              <p>Weekdays</p>
              <p>10:00, 14:00</p>
              <p>Weekends</p>
              <p>10:00, 14:00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">KX Building - Bang Khun Tien (Van)</h3>
              <p>08:30</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Bang Khun Tien - KX Building (Van)</h3>
              <p>18:00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Tesco Lotus - Bang Khun Tien (Van)</h3>
              <p>08:30</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Bang Khun Tien - Tesco Lotus (Van)</h3>
              <p>18:00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">KX Building - Bangmod (Van)</h3>
              <p>11:00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="font-bold text-orange-600">Bangmod - KX Building (Van)</h3>
              <p>12:00</p>
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

          {/* Confirm Button  */}
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
