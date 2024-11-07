import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Scanned() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    try {
      const decodedData = JSON.parse(decodeURIComponent(id));
      setReservationData(decodedData);
    } catch (error) {
      console.error('Error decoding reservation data:', error);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/parking/receipt', { state: { ...reservationData, ...formData } });
  };

  if (!reservationData) {
    return <div>Loading...</div>;
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-semibold">Confirm Reservation</h2>
          <p class="text-gray-600">Please provide your details to confirm the reservation</p>
        </div>
        <div class="px-6 py-4">
          <form onsubmit="handleSubmit(event)" class="space-y-4">
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value="{{ formData.name }}"
                onchange="handleChange(event)"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value="{{ formData.email }}"
                onchange="handleChange(event)"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="space-y-2">
              {/* <p><strong>Floor:</strong> {{ reservationData.floorName }}</p>
              <p><strong>Slot:</strong> {{ reservationData.slotName }}</p>
              <p><strong>Reservation Time:</strong> {{ reservationData,reserveTime }}</p> */}
            </div>
            <button
              type="submit"
              class="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Scanned;