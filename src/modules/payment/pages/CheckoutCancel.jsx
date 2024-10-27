import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import image from "../asset/cancel.png";

const CheckoutCancel = () => {
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/payment");
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left md:ml-32">
          Payment Cancelled
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-4/5 mx-auto">
          <p className="text-lg">
            Your payment has been cancelled. Please go to Payment Center to try again.
          </p>
          <p className="text-lg mt-4">
            You will be redirected back in {countdown} seconds.
          </p>
          <div className="w-full flex justify-center mt-8">
          <img
            src={image}
            alt="Receipt"
            className="max-w-full h-auto rounded-lg"
            style={{ height: "300px" }}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
