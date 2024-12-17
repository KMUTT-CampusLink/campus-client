import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const ParticipantsModal = ({ isOpen, onClose, eventId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && eventId) {
      fetchParticipants();
    }
  }, [isOpen, eventId]);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/clubs/announcements/${eventId}/participants`
      );
      console.log("Reeee", response.data);
      setParticipants(response.data.data);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      alert("Could not load participants. Please try again!");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  console.log(participants);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-700 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold mb-4">Event Participants</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : participants.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {/* Filter out duplicate participants (based on participant.user.id) */}
            {participants
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex(
                    (t) =>
                      t.user?.id === value.user?.id // Ensure each person appears only once
                  )
              )
              .map((participant, index) => {
                // Check if participant is a student or employee and display the appropriate name
                const name = participant.user?.student
                  ? `${participant.user.student.firstname} ${participant.user.student.lastname}`
                  : participant.user?.employee
                  ? `Prof. ${participant.user.employee.firstname} ${participant.user.employee.lastname}`
                  : "Unknown"; // Fallback if no student or employee info is available

                return (
                  <li
                    key={index}
                    className="py-2 flex justify-between items-center"
                  >
                    <span>{name}</span>
                    <span
                      className={`text-sm font-medium ${
                        participant.invoice?.status === "Paid"
                          ? "text-green-600" // Green for Paid
                          : participant.invoice?.status === "Unpaid"
                          ? "text-yellow-600" // Yellow for Unpaid
                          : "text-red-600" // Red for Cancelled
                      }`}
                    >
                      {participant.invoice?.status}
                    </span>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="text-center">No participants found for this event.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipantsModal;
