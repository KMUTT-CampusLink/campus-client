import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import loadingImage from "../asset/verify.svg";
import SuccessImage from "../asset/success.svg";
import { getVerifyStripe } from "../services/api"; // Import API function

const CheckoutSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(4);
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await getVerifyStripe(sessionId); // Call the API function
          if (response?.data?.status === "succeeded") {
            setPaymentStatus("Payment succeeded!");
            const invoiceId = response.data.invoice_id || response.data.installment?.invoice_id;
            if (response.data.type === "installment" && invoiceId) {
              setTimeout(() => {
                window.location.href = `/payment/payment-invoice/${invoiceId}`;
              }, 8000);
            } else {
              setTimeout(() => {
                window.location.href = `/payment`;
              }, 8000);
            }
          } else {
            setPaymentStatus("Payment not completed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus("An error occurred while verifying payment.");
        }
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  useEffect(() => {
    if (paymentStatus) {
      if (countdown === 0) {
        if (paymentStatus === "Payment succeeded!") {
          // Redirect handled by the verifyPayment useEffect
        } else {
          window.location.href = "/payment";
        }
      }

      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, paymentStatus]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="h2 mb-6 text-left md:ml-20">Checkout Status</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-4/5 mx-auto">
          {paymentStatus ? (
            <>
              <p className="h3">{paymentStatus}</p>
              <p className="body-1 mt-4">
                You will be redirected back in {countdown} seconds.
              </p>
              <img
                src={SuccessImage}
                alt="Success"
                className="w-50 h-80 mx-auto mt-8"
              />
            </>
          ) : (
            <>
              <p className="body-1">Verifying payment...</p>
              <img
                src={loadingImage}
                alt="Loading"
                className="w-50 h-80 mx-auto mt-8"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
