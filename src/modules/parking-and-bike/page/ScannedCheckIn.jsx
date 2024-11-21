import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { postCheckin } from '../services/api.js';

function ScannedCheckIn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
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

    const requestData = {
      reservation_id: reservationData.rid,
      checkin_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    try {
      const res = await postCheckin(requestData);
      if (res.message === "QR Checkout created successfully!") {
        alert("Checkin successful!");
        localStorage.clear('checkinData', JSON.stringify(res));
        // Store check-in response data in local storage for use in checkout
        localStorage.setItem('checkoutData', JSON.stringify(res));

        // Navigate to checkout page with the stored data
        navigate('/parking/checkout', { state: res });
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
    if (reservationData) {
      const checkinTimeout = setTimeout(() => {
        handleCheckin();
      }, 1500);
      
      return () => clearTimeout(checkinTimeout);
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
          <h2 className="text-2xl font-semibold">Parking CheckIn</h2>
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

export default ScannedCheckIn;
