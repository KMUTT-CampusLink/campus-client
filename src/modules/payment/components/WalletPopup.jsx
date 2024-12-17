import React from "react";
import { payInvoice } from "../services/api"; // Assuming payInvoice handles Stripe payment
import { GiWallet } from "react-icons/gi"; // Wallet Icon

const WalletPopup = ({ onClose, invoiceId, walletBalance }) => {
  const handleStripePayment = async () => {
    try {
      console.log("Invoice ID being sent:", invoiceId); // Debugging Invoice ID
      const response = await payInvoice({ inv: invoiceId }); // Send invoice ID for Stripe processing
      console.log("API Response:", response); // Log API response for debugging
      if (response?.data?.url) {
        window.location.href = response.data.url; // Redirect to Stripe payment page
      } else {
        console.error("Payment URL not found in response.");
      }
    } catch (error) {
      console.error("Error during full payment:", error.response || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-1/3 flex">
        <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300">
          <div className="text-4xl text-orange-600 mb-2">
            <GiWallet />
          </div>
          <p className="text-gray-700 text-center font-bold text-lg">
            Balance
          </p>
          <p className="text-2xl font-semibold text-center text-gray-900">
            {walletBalance || "--"} THB
          </p>
        </div>
        <div className="w-1/2 flex flex-col space-y-4 pl-6">
          <button
            className="btn bg-payment-red hover:bg-red-400 text-white py-2 px-4 rounded-md"
            onClick={() => {
              console.log("Pay using wallet balance");
              onClose(); // Placeholder for wallet payment
            }}
          >
            Use Wallet Balance
          </button>

          <button
            className="btn bg-orange-600 hover:bg-orange-900 text-white py-2 px-4 rounded-md"
            onClick={handleStripePayment}
          >
            Pay Now (Direct)
          </button>
          <button
            className="text-red-500 mt-4 hover:underline block text-center"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
