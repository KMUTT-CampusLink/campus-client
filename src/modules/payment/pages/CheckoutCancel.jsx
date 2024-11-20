import { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import CancelImage from "../asset/cancel.svg";

const CheckoutCancel = () => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = "/payment";
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="h2 mb-6 text-left md:ml-32">Payment Cancelled</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-4/5 mx-auto">
          <p className="body-1">
            Your payment has been cancelled. Please go to Payment Center to try again.
          </p>
          <p className="body-1 mt-4">
            You will be redirected back in {countdown} seconds.
          </p>
          <img
            src={CancelImage}
            alt="Loading"
            className="w-50 h-80 mx-auto mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
