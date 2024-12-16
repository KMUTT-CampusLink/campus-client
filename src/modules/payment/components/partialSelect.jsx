import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cautionIMG from "../asset/caution.svg";
import "../style/typography.css";
import { previewInstallment, createInstallment } from "../services/api";

const PartialSelect = ({ setShowPartialSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [installmentsPreview, setInstallmentsPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { id: invoiceId } = useParams(); // Get invoiceId from route parameters

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Fetch installment preview from API
  useEffect(() => {
    const fetchPreview = async () => {
      if (selectedOption) {
        const numInstallments = selectedOption === "Two Times" ? 2 : 3; // Set number of installments
        try {
          const response = await previewInstallment(invoiceId, numInstallments);
          setInstallmentsPreview(response.data.installment_preview || []); // Store data in state
        } catch (error) {
          console.error("Error fetching installment preview:", error);
        }
      }
    };
    fetchPreview();
  }, [selectedOption, invoiceId]);

  const handleNextClick = () => {
    if (selectedOption) {
      setShowPreview(true);
    }
  };

  const handleConfirmClick = async () => {
    if (selectedOption) {
      const numInstallments = selectedOption === "Two Times" ? 2 : 3;
      try {
        const response = await createInstallment(invoiceId, numInstallments);
        console.log("Installment created:", response);
        window.location.reload();
      } catch (error) {
        console.error("Error creating installment:", error);
      }
    }
  };

  const handleGoBackClick = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      setShowPartialSelect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md relative">
        <button
          onClick={() => setShowPartialSelect(false)}
          aria-label="Close"
          className="absolute top-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {!showPreview && !showWarning ? (
          <>
            <h2 className="h3 mb-6 text-center">Select Installment Count</h2>
            <div className="flex flex-col space-y-4 ">
              {["Two Times", "Three Times"].map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${selectedOption === option
                      ? "border-payment-red bg-gray-100"
                      : "border-gray-300"
                    }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <input
                    type="radio"
                    className="form-radio mr-4 body-1"
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  <span className="body-1">{option}</span>
                </div>
              ))}
            </div>
            <button
              className="btn bg-payment-red hover:bg-red-500 text-white px-10 py-2 rounded-md shadow-md body-1 mt-6 w-full"
              onClick={handleNextClick}
            >
              Next
            </button>
          </>
        ) : showPreview && !showWarning ? (
          <>
            <h2 className="h3 mb-6 text-center">Installment Preview</h2>
            <div className="flex flex-col space-y-4">
              {Array.isArray(installmentsPreview) && installmentsPreview.length > 0 ? (
                installmentsPreview.map((installment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <span className="body-1">Installment {index + 1}</span>
                    <div className="text-right">
                      <p className="body-1">
                        Due on: {new Date(installment.due_date).toLocaleDateString()}
                      </p>
                      <p className="body-1">Amount: {formatNumberWithCommas(installment.amount)} BAHT</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No installment preview available</p>
              )}
            </div>
            <p className="text-center body-1 text-gray-600 mt-4">
              Interest rate: 5% per year
            </p>
            <button
              className="btn bg-payment-red hover:bg-red-500 text-white px-10 py-2 rounded-md shadow-md body-1 mt-6 w-full"
              onClick={() => setShowWarning(true)}
            >
              Confirm Plans
            </button>
            <button
              className="btn bg-gray-300 hover:bg-gray-400 text-black px-10 py-2 rounded-md shadow-md body-1 mt-4 w-full"
              onClick={handleGoBackClick}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <h2 className="h3 mb-6 text-center">Caution</h2>
            <img
              src={cautionIMG}
              alt="Warning"
              className="w-24 h-24 mx-auto mb-4"
            />
            <p className="body-1 mb-6 text-center">
              This action is irreversible. If you proceed with Partial Pay, you
              cannot go back to Full Pay.
            </p>
            <div className="flex justify-between">
              <button
                className="btn bg-gray-300 hover:bg-gray-400 text-black lg:px-6 lg:py-2 rounded-md shadow-md body-1"
                onClick={handleGoBackClick}
              >
                Go Back
              </button>
              <button
                className="btn bg-payment-red hover:bg-red-500 text-white lg:px-6 lg:py-2 rounded-md shadow-md body-1"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PartialSelect;