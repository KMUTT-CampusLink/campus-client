import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyItemList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track the item being edited
  const [newStatus, setNewStatus] = useState(""); // Store new status for the item

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/security/LostAndFoundList"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setRequests(result.data); // Assuming the data is in `result.data`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Found":
        return { color: "green" };
      case "Returned":
        return { color: "blue" };
      case "Searching...":
        return { color: "orange" };
      default:
        return { color: "black" };
    }
  };

  const handleEditClick = (id, currentStatus) => {
    console.log(
      `Editing item with id: ${id} and current status: ${currentStatus}`
    );
    setEditingId(id);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
    console.log(`Status changed to: ${e.target.value}`);
  };

  const handleStatusUpdate = async (id) => {
    console.log(
      `Attempting to update status for id: ${id} with new status: ${newStatus}`
    );
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/security/updateStatus/${id}`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        // Update the status in the local state
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
        setEditingId(null); // Exit edit mode
        console.log("Status update successful");
      } else {
        console.log("Failed to update status on server");
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "40px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          Lost And Found List
        </h1>

        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 4fr 1fr",
            fontWeight: "bold",
            textAlign: "left",
            padding: "10px",
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
            lineHeight: "1.5",
          }}
        >
          <div>Reporter</div>
          <div>Location</div>
          <div>Description</div>
          <div>Status</div>
        </div>

        {/* Request Rows */}
        {requests.map((request) => (
          <div
            key={request.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 4fr 1fr",
              alignItems: "center",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
              lineHeight: "1.5",
              fontSize: "16px",
            }}
          >
            <div>{request.name}</div>
            <div>{request.found_location}</div>
            <div>{request.description}</div>
            <div style={getStatusStyle(request.status)}>
              {editingId === request.id ? (
                <>
                  <select value={newStatus} onChange={handleStatusChange}>
                    <option value="Found">Found</option>
                    <option value="Returned">Returned</option>
                    <option value="Lost">Lost</option>
                  </select>
                  <button onClick={() => handleStatusUpdate(request.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{request.status}</span>
                  <span
                    onClick={() => handleEditClick(request.id, request.status)}
                    style={{
                      cursor: "pointer",
                      color: "#8b5b34",
                      fontSize: "18px",
                      marginLeft: "10px",
                    }}
                  >
                    ✏️
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
