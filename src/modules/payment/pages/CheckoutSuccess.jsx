import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../registration/components/NavBarComponents/NavBar";

const CheckoutSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(window.location.search).get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Fetch session_id from URL and verify payment
      fetch(`${import.meta.env.VITE_API_URL}/payment/verify-session?session_id=${sessionId}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'succeeded') {
            setPaymentStatus('Payment succeeded!');
          } else {
            setPaymentStatus('Payment not completed.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setPaymentStatus('An error occurred while verifying payment.');
        });
    }
  }, [sessionId]);

  useEffect(() => {
    if (paymentStatus) {
      if (countdown === 0) {
        navigate("/payment");
      }
  
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [countdown, paymentStatus, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full pt-20 px-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left md:ml-32">
          Checkout Status
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-4/5 mx-auto">
          {paymentStatus ? (
            <>
              <p className="text-lg font-semibold">{paymentStatus}</p>
              <p className="text-lg mt-4">
                You will be redirected back in {countdown} seconds.
              </p>
            </>
          ) : (
            <p className="text-lg">Verifying payment...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
