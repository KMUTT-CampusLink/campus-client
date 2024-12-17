import React, { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import PartialSelect from "../components/partialSelect.jsx";
import WalletPopup from "../components/WalletPopup";
import InvoiceImage from "../asset/invoice.svg";
import ArrowLeft from "../asset/arrowL.svg";
import "../style/typography.css";
import { getTransactionDetails, payInvoice } from "../services/api.js"; // Import API functions

const PaymentInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [installments, setInstallments] = useState([]);
  const [showPartialSelect, setShowPartialSelect] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const navigate = useNavigate();

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    console.log("Route ID:", id);

    const fetchInvoiceDetails = async () => {
      try {
        // Fetch transaction details from the API
        const response = await getTransactionDetails(id);

        if (response?.data) {
          const { invoice, installment_details } = response.data;

          // Update state with invoice and installment details
          setInvoice(invoice);
          setInstallments(installment_details || []);
        } else {
          console.error("No data returned from API.");
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const handlePayment = async () => {
    try {
      const response = await payInvoice({ inv: invoice.id });
      console.log(response);

      if (response.data?.url) {
        window.location.href = response.data.url; // Redirect to payment URL
      } else {
        console.error("Payment URL not found in response.");
      }
    } catch (error) {
      console.error("Error during full payment:", error);
    }
  };

  const handlePartialPay = async (installmentId) => {
    try {
      const response = await payInvoice({ ins: installmentId });
      console.log(response);

      if (response.data?.url) {
        window.location.href = response.data.url; // Redirect to payment URL
      } else {
        console.error("Payment URL not found in response.");
      }
    } catch (error) {
      console.error("Error during partial payment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white ">
      <NavBar />
      <div className="w-full pt-20 px-4">
        <div className="bg-white p-0 md:p-6 mb-6 w-full md:w-4/5 mx-auto ">
          <h1 className="h2 text-left flex item-center">
            <img
              src={ArrowLeft}
              alt="Back"
              className="mr-4 w-8 cursor-pointer"
              onClick={() => navigate(`/payment/`)}
            />
            INVOICE
          </h1>

          <div className="grid grid-cols-3 gap-2 mb-4 bg-gray-100 p-4 rounded-lg mt-4 shadow-md ">
            <div className="flex flex-col border-r border-gray-300 ">
              <span className="big-label">Issued</span>
              <span className="body-2">
                {invoice.issued_date
                  ? new Date(invoice.issued_date).toLocaleDateString()
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
                <th className="pb-4  body-1 border-b border-gray-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 service-label">{invoice.title || "N/A"}</td>
                <td className="py-2 service-label">
                  {invoice.amount ? `${formatNumberWithCommas(invoice.amount)} BAHT` : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          {installments.length > 0 ? (
            <div className="mt-8">
              <h2 className="h3 mb-4">Installment Payments</h2>
              <div className="flex flex-col space-y-4">
                {installments.map((installment, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 border rounded-lg shadow-md justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="big-label">{`Installment ${index + 1}`}</h3>
                        <p className="body-2 block text-gray-500">
                          Due on{" "}
                          {new Date(installment.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-4">
                      <div className="flex flex-col items-end">
                        <p className="big-label text-payment-red">
                          {formatNumberWithCommas(installment.amount)} BAHT
                        </p>
                        <p className={`body-1 ${installment.status === 'Unpaid' ? 'text-yellow-500' : 'text-green-600'}`}>
                          {installment.status.toUpperCase()}
                        </p>

                      </div>
                      <button
                        className={`btn px-4 py-2 rounded-md shadow-md body-1 ${installment.status === 'Paid' ||
                          !installments.slice(0, index).every(inst => inst.status === 'Paid')
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-payment-red hover:bg-red-500 text-white'
                          }`}
                        onClick={() => {
                          if (
                            installments.slice(0, index).every(inst => inst.status === 'Paid') &&
                            installment.status !== 'Paid'
                          ) {
                            handlePartialPay(installment.id);
                          }
                        }}
                        disabled={
                          installment.status === 'Paid' ||
                          !installments.slice(0, index).every(inst => inst.status === 'Paid')
                        }
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="body-2 text-gray-500 mt-4">No installment payments found.</p>
          )}
        </div>
        {invoice.status === "Unpaid" && (
          <div className="flex justify-end w-full md:w-4/5 mx-auto">
            <button
              className="btn bg-payment-red hover:bg-red-500 text-white lg:px-10 py-2 mr-2 rounded-md shadow-md body-1"
              onClick={() => setShowPartialSelect(true)}
            >
              Installment Plan
            </button>
            <button
              className="btn bg-payment-red hover:bg-red-500 text-white lg:px-10 py-2 rounded-md shadow-md body-1"
              onClick={() => setShowWalletPopup(true)} // Toggle WalletPopup
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
      <img
        src={InvoiceImage}
        alt="invoice"
        className="w-50 h-40 mx-auto mt-12"
      />
      {showPartialSelect && (
        <PartialSelect setShowPartialSelect={setShowPartialSelect} />
      )}
      {showWalletPopup && (
        <WalletPopup
          onClose={() => setShowWalletPopup(false)} // Close popup handler
          invoiceId={invoice.id}
          invoiceAmount={invoice.amount} // Pass invoice amount for wallet logic
        />
      )}
    </div>
  );
};

export default PaymentInvoice;
