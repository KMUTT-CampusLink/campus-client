import React, { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams } from "react-router-dom";
import { transactions } from "../components/Transaction";
import InvoiceImage from '../asset/invoice.svg';
import { dotenv } from "dotenv";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inv: invoice.id }), // ส่ง invoiceId ไปที่ backend
    })
      .then((response) => response.json())
      .then((data) => {
        // เปลี่ยนเส้นทางผู้ใช้ไปยัง Stripe Checkout
        console.log(data);
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-white ">
      <NavBar />
      <div className="w-full pt-20 px-4">
        <h1 className="h2 text-left md:ml-32">
          INVOICE
        </h1>
        <div className="bg-white p-0 md:p-6 mb-6 w-full md:w-4/5 mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-100 p-4 rounded-lg shadow-md ">
            <div className="flex flex-col border-r border-gray-300 ">
              <span className="big-label">Issued</span>
              <span className="body-2">
                {invoice.issue_date
                  ? new Date(invoice.issue_date).toLocaleDateString()
                  : "N/A"}
              </span>
              <span className="big-label mt-4">Due</span>
              <span className="body-2">
                {invoice.due_date
                  ? new Date(invoice.due_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col  border-r border-gray-300">
              <span className="big-label">Billed to</span>
              <span className="body-2">{invoice.issued_by || "N/A"}</span>
            </div>
            <div className="flex flex-col ">
              <span className="big-label">Invoice ID</span>
              <span className="body-2">{invoice.id || "N/A"}</span>
            </div>
          </div>
          <table className="w-full text-left mt-6">
            <thead>
              <tr>
                <th className="pb-4 body-1 border-b border-gray-300">
                  Service
                </th>
                <th className="pb-4  body-1 border-b border-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 service-label">{invoice.title || "N/A"}</td>
                <td className="py-2 service-label">
                  {invoice.amount ? `${invoice.amount} BAHT` : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end w-full md:w-4/5 mx-auto">
          <button
            className="bg-red-500 text-white px-10 py-2 rounded-md shadow-md hover:bg-red-600 body-1"
            onClick={handlePayment} // เมื่อกดปุ่มจะเรียกฟังก์ชัน handlePayment
          >
            PAY
          </button>
        </div>
      </div>
      <img src={InvoiceImage}alt="invoice" className="w-50 h-40 mx-auto mt-6"/>
    </div>
  );
};

export default PaymentInvoice;
