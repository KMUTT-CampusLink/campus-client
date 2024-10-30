import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ConfirmBookingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample booking details
  const bookingDetails = {
    from: 'Bangmod',
    to: 'Bang Khun Tien',
    date: '16 October 2024',
    time: '08:30',
  };

  const handleBackToHome = () => {
    navigate('/transport/home'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section without icons */}
      <header className="hidden min-[900px]:block text-white bg-gradient-to-r from-[#c2544d] to-[#f09107] h-16 w-full shadow-lg mb-10">
        {/* Empty header for spacing */}
      </header>

      <div className="flex container mx-auto px-4 justify-center">
        {/* Booking Confirmation Box */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center mb-10">
          {/* Confirmation Icon */}
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl mb-4"
          />

          {/* Confirmation Message */}
          <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your ride has been successfully booked.
          </p>

          {/* Booking Details */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 text-left">
            <h3 className="font-semibold text-lg mb-2">Booking Details</h3>
            <p className="text-gray-700"><span className="font-medium">From:</span> {bookingDetails.from}</p>
            <p className="text-gray-700"><span className="font-medium">To:</span> {bookingDetails.to}</p>
            <p className="text-gray-700"><span className="font-medium">Date:</span> {bookingDetails.date}</p>
            <p className="text-gray-700"><span className="font-medium">Time:</span> {bookingDetails.time}</p>
          </div>

          {/* QR Code Placeholder Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Your QR Code</h3>
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg mb-2">
              <span className="text-gray-500">[QR Code Placeholder]</span>
            </div>
            <p className="text-gray-600">Scan your QR code at the bus entrance.</p>
          </div>

          {/* Back to Home Button */}
          <button 
            onClick={handleBackToHome}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
