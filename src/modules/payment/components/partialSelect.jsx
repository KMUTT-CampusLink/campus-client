import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cautionIMG from "../asset/caution.svg";
import "../style/typography.css";

const PartialSelect = ({ setShowPartialSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { id: invoiceId } = useParams(); // Get invoiceId from route parameters

  const handleNextClick = () => {
    if (selectedOption) {
      setShowWarning(true);
    }
  };

  const handleConfirmClick = () => {
    const installmentCount = selectedOption === "Two Times" ? 2 : 3;
    navigate(`/payment/partial-payment/${invoiceId}/${installmentCount}`);
  };

  const handleGoBackClick = () => {
    setShowPartialSelect(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md">
        {!showWarning ? (
          <>
            <h2 className="h3 mb-6 text-center">Select Installment Count</h2>
            <div className="flex flex-col space-y-4 ">
              {["One Time", "Two Times", "Three Times"].map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer  ${
                    selectedOption === option
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
