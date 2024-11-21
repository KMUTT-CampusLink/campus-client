import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance"; // Ensure axiosInstance is correctly configured
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function StudentMaintenanceList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await axiosInstance.get("/security/MaintenanceList"); // Correct API endpoint
        if (response.data.success) {
          setRequests(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequests();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { color: "green" };
      case "Processed":
        return { color: "orange" };
      case "Finished":
        return { color: "purple" };
      default:
        return { color: "black" };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return { color: "red", fontWeight: "bold" };
      case "Medium":
        return { color: "orange", fontWeight: "bold" };
      case "Low":
        return { color: "green", fontWeight: "bold" };
      default:
        return { color: "black" };
    }
  };

  const pageStyles = {
    container: {
      maxWidth: "1000px",
      margin: "50px auto",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      position: "relative",
    },
    header: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    tableHeader: {
      display: "grid",
      gridTemplateColumns: "1fr 3fr 1fr 1fr",
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px",
    },
    requestCard: {
      display: "grid",
      gridTemplateColumns: "1fr 3fr 1fr 1fr",
      alignItems: "center",
      padding: "20px",
      marginBottom: "15px",
      borderRadius: "12px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
    },
    statusText: {
      fontWeight: "bold",
    },
    floatingButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#8b5b34",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#fff",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    },
  };

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
                Maintenance Request List
              </h1>
              <button
                className="bg-[#8b5b34] p-3 rounded-full shadow-lg hover:bg-[#6e3f35] transition-all duration-300"
                onClick={() => navigate("/security/student/request")}
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
  
            {/* Table Header */}
            <div className="grid grid-cols-4 font-medium text-gray-600 bg-gray-200 rounded-t-lg py-3 px-4">
              <div>Room</div>
              <div>Detail</div>
              <div>Status</div>
              <div>Priority</div>
            </div>
  
            {/* Request List */}
            {loading ? (
              <p className="text-center text-gray-500 py-6">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500 py-6">{error}</p>
            ) : (
              requests.map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center bg-gray-50 border-b hover:bg-gray-100 transition-all duration-300 py-4 px-4 text-gray-700"
                >
                  <div>{request.room_id}</div>
                  <div>{request.description}</div>
                  <div
                    className="font-bold"
                    style={getStatusStyle(request.status)}
                  >
                    {request.status}
                  </div>
                  <div
                    className="font-bold"
                    style={getPriorityStyle(request.priority)}
                  >
                    {request.priority}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
  
}
