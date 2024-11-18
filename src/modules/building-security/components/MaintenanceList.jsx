import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MaintenanceList() {
  const [requests, setRequests] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation

  // Fetch maintenance requests from the backend API
  useEffect(() => {
    fetch("http://localhost:3000/api/security/MaintenanceList") // Adjust URL if necessary
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRequests(data.data); // Update state with fetched data
        } else {
          console.error("Failed to fetch maintenance requests:", data.message);
          setError(data.message);
        }
        setLoading(false); // Stop loading indicator
      })
      .catch((error) => {
        console.error("Error fetching maintenance requests:", error);
        setError("Error fetching data");
        setLoading(false); // Stop loading even on error
      });
  }, []);

  // Style based on status
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

  // Style based on priority
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

  // Page styles
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
      gridTemplateColumns: "1fr 3fr 1fr 1fr", // Added column for Priority
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px",
    },
    requestCard: {
      display: "grid",
      gridTemplateColumns: "1fr 3fr 1fr 1fr", // Adjusted to include Priority column
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
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Maintenance Request List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Table Headers */}
          <div style={pageStyles.tableHeader}>
            <div>Room</div>
            <div>Detail</div>
            <div>Status</div>
            <div>Priority</div> {/* Priority column header */}
          </div>

          {/* Request Cards */}
          {requests.map((request, index) => (
            <div key={index} style={pageStyles.requestCard}>
              <div>{request.location}</div>
              <div>{request.description}</div>
              <div style={getStatusStyle(request.status)}>
                <span style={pageStyles.statusText}>{request.status}</span>
              </div>
              <div style={getPriorityStyle(request.priority)}>
                <span>{request.priority}</span> {/* Styled Priority */}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Floating Add Button */}
      <button
        style={pageStyles.floatingButton}
        onClick={() => navigate("/security/administrator/request")}
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
  );
}
