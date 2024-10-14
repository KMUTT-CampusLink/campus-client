import React from "react";

export default function MaintenanceList() {
  const requests = [
    {
      room: "CB305",
      detail:
        "It's pink backpack with my name tag It's pink backpack with my name tag It's pink backpack with my name tag",
      status: "Processing",
    },
    {
      room: "CB305",
      detail:
        "It's pink backpack with my name tag It's pink backpack with my name tag It's pink backpack with my name tag",
      status: "Processed",
    },
    {
      room: "CB305",
      detail:
        "It's pink backpack with my name tag It's pink backpack with my name tag It's pink backpack with my name tag",
      status: "Finished",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return { color: "green" };
      case "Processed":
        return { color: "orange" };
      case "Finished":
        return { color: "purple" };
      default:
        return { color: "black" };
    }
  };

  // Styles for the page (matching size with the form)
  const pageStyles = {
    container: {
        maxWidth: "1000px", // Keep the width at 1000px
        margin: "50px 0 50px 600px", // Increase left margin to move container more to the right
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
        gridTemplateColumns: "1fr 3fr 1fr",
        fontWeight: "bold",
        textAlign: "left",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      },
      requestCard: {
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
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
        fontSize: "36px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
      },
    };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Maintenance Request List</h1>

      {/* Table Headers */}
      <div style={pageStyles.tableHeader}>
        <div>Room</div>
        <div>Detail</div>
        <div>Status</div>
      </div>

      {/* Request Cards */}
      {requests.map((request, index) => (
        <div key={index} style={pageStyles.requestCard}>
          <div>{request.room}</div>
          <div>{request.detail}</div>
          <div style={getStatusStyle(request.status)}>
            <span style={pageStyles.statusText}>{request.status}</span>
          </div>
        </div>
      ))}

      {/* Floating Add Button */}
      <div
        style={pageStyles.floatingButton}
        onClick={() => console.log("Add new request")}
      >
        +
      </div>
    </div>
  );
}
