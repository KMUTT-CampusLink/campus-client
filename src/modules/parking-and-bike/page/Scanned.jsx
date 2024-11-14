import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Scanned() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    try {
      const decodedData = JSON.parse(decodeURIComponent(id));
      setReservationData(decodedData);
    } catch (error) {
      console.error('Error decoding reservation data:', error);
    }
  }, [id]);

  const handleCheckin = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const requestData = {
      reservation_id: reservationData.rid,
      checkin_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    console.log("Request Data:", requestData);

    try {
      const res = await axios.post(`http://localhost:3000/api/parking/postCheckin`, requestData);
      if (res.data.message === "QR Checkout created successfully!") {
        alert("Checkin successful!");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    }
  };

  const handleClick = () => {
    navigate('/parking');
  };

  if (!reservationData) {
    return <div>Loading...</div>;
  } else {
    setTimeout(() => {
      handleCheckin();
    }, 1500);
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div class="flex justify-center px-5 py-10 border-b border-gray-200">
          <h2 class="text-2xl font-semibold">Parking CheckIn</h2>
        </div>
        <div class="flex flex-col px-5 py-10 gap-2 justify-center items-center">
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

export default Scanned;