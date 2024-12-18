import { format } from "date-fns";
import { FaUser, FaBus, FaCalendarAlt, FaClock } from "react-icons/fa"; // Updated to include bus icon
import { useNavigate } from "react-router-dom";
import { bookTrip } from "../services/api";

const TripList = ({ trips }) => {
  const navigate = useNavigate();
  const handleBooking = async (tripID) => {
    navigate(`/transport/booking/${tripID}`);
  };

  return (
    <div className="w-full p-4 font-geologica">
      {/* Show a message 'No routes available' if there are no routes */}
      {trips.length === 0 ? (
        <div className="text-3xl text-center text-gray-500">
          No active trips for this route.
        </div>
      ) : (
        trips.map((trip, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-md rounded-lg p-6 w-full mb-4 transition-transform transform hover:scale-[1.01]"
          >
            <div className="flex justify-between mb-4">
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <FaUser className="text-orange-600 mr-2" />
                  <span>Driver ID: {trip.driver_id}</span>
                </div>
                <div className="flex items-center">
                  <FaBus className="text-orange-600 mr-2" />
                  <span>Bus ID: {trip.vehicle_id}</span>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <FaClock className="text-orange-600 mr-2" />
                  <span>
                    Start:{" "}
                    {format(new Date(trip.trip_schedule.start_time), "HH:mm")}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-orange-600 mr-2" />
                  <span>
                    End:{" "}
                    {format(new Date(trip.trip_schedule.end_time), "HH:mm")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <FaCalendarAlt className="text-orange-600 mr-2" />
                  <span>
                    Date: {format(new Date(trip.trip_date), "yyyy-MM-dd")}
                  </span>
                </div>
                <div className="flex items-center">
                  <span>Day: {trip.trip_schedule.day}</span>
                </div>
              </div>
            </div>

            {/* Centered button to book the trip */}
            <div className="flex justify-center mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBooking(trip.id);
                }}
                className="py-1 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripList;