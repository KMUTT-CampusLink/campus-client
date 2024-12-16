import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance"; // Ensure axiosInstance is correctly configured
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function AdministratorGuardReservationList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuardRequests = async () => {
      try {
        const response = await axiosInstance.get("/security/GuardList"); // Correct API endpoint
        if (response.data.success) {
          setRequests(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchGuardRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/security/deleteGuard/${id}`);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
      alert("Request deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete the request.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <br />
        <br />
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-gray-100 to-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Guard Reservation List
            </h1>
            <button
              className="bg-[#8b5b34] p-3 rounded-full shadow-lg hover:bg-[#6e3f35] transition-all duration-300"
              onClick={() =>
                navigate("/security/administrator/guardreservation")
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

          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      ID
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Building
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      User Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Guard Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Description
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {request.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {request.building?.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {request.user?.employee?.firstname}{" "}
                        {request.user?.employee?.lastname}{" "}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {request.guard?.employee?.firstname}{" "}
                        {request.guard?.employee?.lastname}{" "}
                        {/* Display guard name */}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {request.description}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="bg-red-100 hover:bg-red-200 rounded-full p-2 shadow-sm transition-all duration-300"
                          title="Delete Request"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="red"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 2.25h6a2.25 2.25 0 0 1 2.25 2.25v.75M4.5 6.75h15m-1.5 0-.664 12.159a2.25 2.25 0 0 1-2.245 2.091H8.409a2.25 2.25 0 0 1-2.245-2.091L5.5 6.75m3.75 3v6m6-6v6"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
