import React, { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams } from "react-router-dom";
import { transactions } from "../components/Transaction";

const PaymentInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    console.log("Route ID:", id);
    const foundInvoice = transactions.find(
      (transaction) => transaction.id === id
    );
    console.log("Found Invoice:", foundInvoice);
    if (foundInvoice) {
      setInvoice(foundInvoice);
    }
  }, [id]);

  useEffect(() => {
    const foundInvoice = transactions.find(
      (transaction) => transaction.id === id
    );
    if (foundInvoice) {
      setInvoice(foundInvoice);
    }
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left md:ml-32">
          INVOICE
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full md:w-4/5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex flex-col px-4 md:border-r md:border-gray-300">
              <span className="text-gray-600">Issued</span>
              <span className="font-semibold">
                {invoice.issue_date
                  ? new Date(invoice.issue_date).toLocaleDateString()
                  : "N/A"}
              </span>
              <span className="text-gray-600 mt-4">Due</span>
              <span className="font-semibold">
                {invoice.due_date
                  ? new Date(invoice.due_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col px-4 md:border-r md:border-gray-300">
              <span className="text-gray-600">Billed to</span>
              <span className="font-semibold">
                {invoice.issued_by || "N/A"}
              </span>
            </div>
            <div className="flex flex-col px-4">
              {" "}
              <span className="text-gray-600">Invoice ID</span>
              <span className="font-semibold">{invoice.id || "N/A"}</span>
            </div>
          </div>
          <table className="w-full text-left mt-6">
            <thead>
              <tr>
                <th className="pb-4">Service</th>
                <th className="pb-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">{invoice.title || "N/A"}</td>
                <td className="py-2">
                  {invoice.amount ? `${invoice.amount} BAHT` : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-8">
            <span className="font-semibold">Subtotal</span>
            <span className="font-semibold">{invoice.amount} BAHT</span>
          </div>
        </div>
        <div className="flex justify-end w-full md:w-4/5 mx-auto">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600">
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
