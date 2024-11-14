import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    navigate('/parking', { state: { ...reservationData } });

    const requestData = {
      resId: ''
    }

    try {
      const res = await Axios.post(``, requestData);
    } catch (error) {

    }
  };

  if (!reservationData) {
    return <div>Loading...</div>;
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-semibold">Reservation Success</h2>
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