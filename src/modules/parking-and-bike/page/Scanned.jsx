import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const requestData = {
      reservation_id: reservationData.rid,
      checkin_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    console.log("Request Data:", requestData);

    try {
      const res = await axios.post(`http://localhost:3000/api/parking/postCheckin`, requestData);
      console.log("Response:", res.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    }
  };


  if (!reservationData) {
    return <div>Loading...</div>;
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-semibold">Reservation</h2>
        </div>
        <div class="px-6 py-4">
          <button
            type="submit"
            onClick={handleSubmit}
            class="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>

  );
}

export default Scanned;