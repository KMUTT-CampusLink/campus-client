import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance"; // Import the configured axiosInstance
import { getLostAndFoundList } from "../../services/api";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function AdministratorLostAndFoundList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getLostAndFoundList();
      setRequests(response.data.data);
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
      case "Found":
        return { color: "green" };
      case "Returned":
        return { color: "blue" };
      case "Lost":
        return { color: "orange" };
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
        `/security/updateStatus/${id}`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
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
                Lost And Found List
              </h1>
              <button
                className="bg-[#8b5b34] p-3 rounded-full shadow-lg hover:bg-[#6e3f35] transition-all duration-300"
                onClick={() =>
                  navigate("/security/administrator/lostandfoundform")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
                    <th className="p-4 text-left font-medium">Name</th>
                    <th className="p-4 text-left font-medium">Room</th>
                    <th className="p-4 text-left font-medium">Detail</th>
                    <th className="p-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="bg-gray-50 border-b hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="p-4 text-sm md:text-base">
                        {request.name}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {request.floor_id}
                      </td>
                      <td className="p-4 text-sm md:text-base">
                        {request.description}
                      </td>
                      <td
                        className="p-4 text-sm md:text-base"
                        style={getStatusStyle(request.status)}
                      >
                        {editingId === request.id ? (
                          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                            <select
                              value={newStatus}
                              onChange={handleStatusChange}
                              className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
                            >
                              <option value="Found">Found</option>
                              <option value="Returned">Returned</option>
                              <option value="Lost">Lost</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(request.id)}
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
                            <span>{request.status}</span>
                            <button
                              onClick={() =>
                                handleEditClick(request.id, request.status)
                              }
                              className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                            >
                              ✏️
                            </button>
                          </div>
                        )}
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
