import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance"; // Import the configured axiosInstance
import { getLostAndFoundList } from "../../services/api";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function StudentMyItemList() {
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
      const response = await axiosInstance.patch(`/updateStatus/${id}`, {
        status: newStatus,
      });

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
      <div className="container">
        <h1>My Item List</h1>
        <p>Detailed information</p>
        <div className="relative bg-gray-100 min-h-screen p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">My Item List</h1>
              <button
                className="bg-[#8b5b34] p-2 rounded-full shadow-lg hover:bg-[#6e3f35]"
                onClick={() =>
                  navigate("/security/student/lostandfound")
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
            <hr className="my-4" />

            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-3 text-gray-600">Items</th>
                  <th className="p-3 text-gray-600">Room</th>
                  <th className="p-3 text-gray-600">Detail</th>
                  <th className="p-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((request) => (
                    <tr
                      key={request.id}
                      className="bg-white shadow-sm rounded-lg mb-4"
                    >
                      <td className="p-3">{request.name}</td>
                      <td className="p-3">{request.found_location}</td>
                      <td className="p-3">{request.description}</td>
                      <td
                        className="p-3"
                        style={getStatusStyle(request.status)}
                      >
                        {editingId === request.id ? (
                          <div className="flex items-center">
                            <select
                              value={newStatus}
                              onChange={handleStatusChange}
                              className="border rounded p-1 mr-2"
                            >
                              <option value="Found">Found</option>
                              <option value="Returned">Returned</option>
                              <option value="Lost">Lost</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(request.id)}
                              className="bg-green-500 text-white px-2 rounded mr-1"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-red-500 text-white px-2 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-between"
                            style={{ minWidth: "90px" }}
                          >
                            <span>{request.status}</span>
                            <button
                              onClick={() =>
                                handleEditClick(request.id, request.status)
                              }
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
    </>
  );
}
