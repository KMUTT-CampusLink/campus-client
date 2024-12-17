import React, { useEffect, useState } from "react";
import { payInvoice, fetchUserWallet } from "../services/api"; // Import fetchUserWallet from api.js
import { GiWallet } from "react-icons/gi"; // Wallet Icon

const WalletPopup = ({ onClose, invoiceId, invoiceAmount }) => {
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const getWalletBalance = async () => {
      try {
        const data = await fetchUserWallet(); // Use fetchUserWallet from api.js
        setWalletBalance(data.wallet);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setWalletBalance(0); // Default to 0 in case of error
      }
    };
    getWalletBalance();
  }, []);

  const handleWalletPayment = async () => {
    if (walletBalance < invoiceAmount) {
      alert("Insufficient wallet balance to complete this payment.");
      return;
    }

    try {
      console.log("Attempting to pay using wallet balance...");
      const response = await payInvoice({ inv: invoiceId, useWallet: true });
      if (response?.data?.status === "success") {
        alert("Payment successful using wallet!");
        window.location.reload(); // Or navigate as needed
      } else {
        alert("Failed to process wallet payment.");
      }
    } catch (error) {
      console.error("Error during wallet payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

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
            {walletBalance !== null ? `${walletBalance} THB` : "--"}
          </p>
        </div>
        <div className="w-1/2 flex flex-col space-y-4 pl-6">
          <button
            className={`btn bg-payment-red hover:bg-red-400 text-white py-2 px-4 rounded-md ${
              walletBalance < invoiceAmount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleWalletPayment}
            disabled={walletBalance < invoiceAmount}
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
