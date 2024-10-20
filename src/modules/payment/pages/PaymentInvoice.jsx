import React, { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams } from "react-router-dom";
import { transactions } from "../components/Transaction";
import { dotenv } from 'dotenv';

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

  // ฟังก์ชันสำหรับเรียก API ไปที่ backend เพื่อสร้าง Checkout Session กับ Stripe
  const handlePayment = () => {
    fetch(`${import.meta.env.VITE_API_URL}/payment/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inv: invoice.id }) // ส่ง invoiceId ไปที่ backend
    })
    .then(response => response.json())
    .then(data => {
      // เปลี่ยนเส้นทางผู้ใช้ไปยัง Stripe Checkout
      console.log(data);
      if (data.url) {
        window.location.href = data.url;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

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
              <span className="text-gray-600 font-bold">Issued</span>
              <span>
                {invoice.issue_date
                  ? new Date(invoice.issue_date).toLocaleDateString()
                  : "N/A"}
              </span>
              <span className="text-gray-600 font-bold mt-4">Due</span>
              <span>
                {invoice.due_date
                  ? new Date(invoice.due_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col px-4 md:border-r md:border-gray-300">
              <span className="text-gray-600 font-bold">Billed to</span>
              <span>{invoice.issued_by || "N/A"}</span>
            </div>
            <div className="flex flex-col px-4">
              <span className="text-gray-600 font-bold">Invoice ID</span>
              <span>{invoice.id || "N/A"}</span>
            </div>
          </div>
          <table className="w-full text-left mt-6">
            <thead>
              <tr>
                <th className="pb-4 font-georama">Service</th>
                <th className="pb-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 font-georama">{invoice.title || "N/A"}</td>
                <td className="py-2">
                  {invoice.amount ? `${invoice.amount} BAHT` : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end w-full md:w-4/5 mx-auto">
          <button 
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600"
            onClick={handlePayment} // เมื่อกดปุ่มจะเรียกฟังก์ชัน handlePayment
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
