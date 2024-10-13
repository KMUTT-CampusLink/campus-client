// PaymentInvoice.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactions } from "../components/Transaction"; // Import mock data
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; 

// Utility function to format the timestamp to DD/MM/YYYY
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const PaymentInvoice = () => {
  const { id } = useParams(); // Get the id from the route
  const navigate = useNavigate();

  // Find the transaction by id
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return <p className="text-center mt-10">Transaction not found.</p>;
  }

  // Assuming amount is the total. If you have a breakdown, adjust accordingly.
  const subtotal = transaction.amount;

  return (
    <div className="container mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white max-w-md">
      {/* Back Button */}
      <button
        className="flex items-center text-blue-500 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">INVOICE</h1>

      {/* Invoice details */}
      <div className="grid grid-cols-1 gap-4 bg-gray-100 p-4 rounded-lg mb-6">
        <div>
          <p className="font-semibold">Issued Date:</p>
          <p>{formatDate(transaction.issue_date)}</p>
        </div>
        <div>
          <p className="font-semibold">Billed To:</p>
          <p>{transaction.issued_by}</p>
        </div>
        <div>
          <p className="font-semibold">Invoice ID:</p>
          <p>{transaction.id}</p>
        </div>
        <div>
          <p className="font-semibold">Due Date:</p>
          <p>{formatDate(transaction.due_date)}</p>
        </div>
      </div>

      {/* Service Details */}
      <div className="mb-6">
        <p className="font-semibold">Service:</p>
        <p>{transaction.title}</p>
      </div>

      {/* Amount to Pay */}
      <div className="mb-6">
        <p className="font-semibold">Amount to Pay:</p>
        <p className="text-lg">{`${transaction.amount} BAHT`}</p>
      </div>

      {/* Payment Button */}
      <button className="btn btn-primary bg-orange-600 w-full py-2">
        PAY {`${transaction.amount} BAHT`}
      </button>
    </div>
  );
};

export default PaymentInvoice;
