import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import ArrowLeft from "../asset/arrowL.svg";
import PartialImage from "../asset/Partial.svg";
import "../style/typography.css";

const PartialPayment = () => {
  const { installmentCount, invoiceId } = useParams();
  const [installments, setInstallments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate mock data for installment payments based on user selection
    const generatedInstallments = Array.from({ length: installmentCount }).map(
      (_, index) => ({
        id: index + 1,
        title: "LAPTOP",
        dueDate: "24/5/2023",
        amount: "230 BAHT",
        status: "Partial Payment",
      })
    );
    setInstallments(generatedInstallments);
  }, [installmentCount]);

  const handlePayClick = (installmentId) => {
    navigate(`/payment/pay-installment/${invoiceId}/${installmentId}`);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="w-full pt-20 px-4">
        <div className="bg-white p-0 md:p-6 mb-6 w-full md:w-4/5 mx-auto ">
          <div className="flex flex-col lg:gap-32 lg:flex-row h-auto ">
            <div className="relative w-full lg:h-screen lg:w-1/2 flex items-center justify-center lg:pb-40 lg:mt-0 lg:mb-0 ">
              <img
                src={PartialImage}
                alt="Partial Payment"
                className="w-50 h-80 mx-auto"
              />
            </div>
            <div className="flex flex-col space-y-6 w-full lg:w-1/2">
              <h1 className="h2 text-left flex item-center">
                <img
                  src={ArrowLeft}
                  alt="Back"
                  className="mr-4 w-8 cursor-pointer"
                  onClick={() => navigate(`/payment/`)}
                />
                Partial Payments
              </h1>
              {installments.map((installment) => (
                <div
                  key={installment.id}
                  className="flex items-center p-4 border rounded-lg shadow-md justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span className="circle-number body-1 bg-payment-red text-white flex items-center justify-center">
                      {installment.id}
                    </span>
                    <div>
                      <h3 className="big-label">{installment.title}</h3>
                      <p className="body-2 block text-gray-500">
                        Due on {installment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="big-label text-payment-red">{installment.amount}</p>
                    <p className="body-1 text-yellow-500">{installment.status.toUpperCase()}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-circle bg-payment-red hover:bg-red-500 text-white ml-2"
                    onClick={() => handlePayClick(installment.id)}
                  >
                    ➔
                  </button>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartialPayment;
