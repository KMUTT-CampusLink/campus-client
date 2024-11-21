import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postCheckout } from '../services/api.js';

function ScannedCheckOut() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Decode the data from the URL parameter
      const decodedData = JSON.parse(decodeURIComponent(id));
      setReservationData(decodedData);
      setLoading(false);
    } catch (error) {
      console.error('Error decoding reservation data:', error);
      setLoading(false);
    }
  }, [id]);

  const handleCheckin = async () => {
    if (!reservationData) return;

    // Prepare the request data with current time for check-in
    const requestData = {
      reservation_id: reservationData.rid,
      checkout_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    console.log("Request Data:", requestData);

    try {
      const res = await postCheckout(requestData);
      if (res.message === "Checkout and Invoice completed successfully!") {
        alert("Checkout Successful! Your Invoice Has Been Created!");
        // Navigate to checkout page with reservationData
        localStorage.clear('checkoutData', JSON.stringify(res));
        navigate('/parking', { state: res });
        console.log(res);
        
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    // Delay to simulate a loading time before automatic check-in
    if (reservationData) {
      const checkoutTimeout = setTimeout(() => {
        handleCheckin();
      }, 1500);
      
      return () => clearTimeout(checkoutTimeout);
    }
  }, [reservationData]);

  const handleClick = () => {
    navigate('/parking');
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex justify-center px-5 py-10 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Parking CheckOut</h2>
        </div>
        <div className="flex flex-col px-5 py-10 gap-2 justify-center items-center">
          <FontAwesomeIcon className='w-14 h-14 text-yellow-500 animate-spin' icon={faSpinner} />
          <button onClick={handleClick}
            className="bg-red-500 text-white px-10 py-1 mt-10 rounded-lg hover:bg-red-600 transition z-10"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScannedCheckOut;