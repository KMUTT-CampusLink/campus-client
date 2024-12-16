import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
// import { getGuardReservationList } from "../../services/api.js";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function AdministratorGuardReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getGuardReservationList();
      setReservations(response.data.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return { color: "green" };
      case "Pending":
        return { color: "orange" };
      case "Cancelled":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  };

  const handleEditClick = (id, currentStatus) => {
    setEditingId(id);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleStatusUpdate = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `/security/updateGuardStatus/${id}`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id
              ? { ...reservation, status: newStatus }
              : reservation
          )
        );
        setEditingId(null);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <br />
        <br />
        <div className="relative bg-gray-50 min-h-screen py-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-gray-100 to-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                Guard Reservation List
              </h1>
              <button
                className="p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300"
                onClick={() => navigate("/security/administrator")}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 011 12h-3"
                  />
                </svg>
              </button>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-4 text-left font-medium">Id</th>
                    <th className="p-4 text-left font-medium">Username</th>
                    <th className="p-4 text-left font-medium">Guardname</th>
                    <th className="p-4 text-left font-medium">Start Time</th>
                    <th className="p-4 text-left font-medium">End Time</th>
                    <th className="p-4 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="bg-gray-50 border-b hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="p-4 text-sm md:text-base">
                        {reservation.user_id}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {reservation.guard_id}
                      </td>
                      <td
                        className="p-4 text-sm md:text-base"
                        style={getStatusStyle(reservation.status)}
                      >
                        {editingId === reservation.id ? (
                          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                            <select
                              value={newStatus}
                              onChange={handleStatusChange}
                              className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(reservation.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600 transition-all duration-300"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between min-w-[90px]">
                            <span>{reservation.status}</span>
                            <button
                              onClick={() =>
                                handleEditClick(
                                  reservation.id,
                                  reservation.status
                                )
                              }
                              className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                            >
                              ✏️
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {reservation.start_time}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {reservation.end_time}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {reservation.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
