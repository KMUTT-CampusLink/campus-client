import React from "react";

export default function MyItemList() {
  const requests = [
    {
      author: "Chawisa",
      room: "CB305",
      detail: "It's pink backpack with my name",
      status: "Found",
    },
    {
      author: "Chawisa",
      room: "CB306",
      detail: "It's pink backpack with my name",
      status: "Received",
    },
    {
      author: "Chawisa",
      room: "CB306",
      detail: "It's pink backpack with my name",
      status: "Searching...",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Found":
        return { color: "green" };
      case "Received":
        return { color: "blue" };
      case "Searching...":
        return { color: "orange" };
      default:
        return { color: "black" };
    }
  };

  const pageStyles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "200px",
      height: "100vh", // Full viewport height for vertical centering
      // backgroundColor: "#f0f0f0", // Background color for the page
    },
    container: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "left",
    },
    tableHeader: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 4fr 1fr",
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "10px",
      lineHeight: "1.5",
    },
    requestRow: {
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
    },
    statusText: {
      fontWeight: "bold",
    },
    icon: {
      cursor: "pointer",
      color: "#8b5b34",
      fontSize: "18px",
      marginLeft: "10px",
    },
  };

  // Responsive media query styles
  const mediaQueryStyles = `
    @media (max-width: 1200px) {
      .requestRow {
        grid-template-columns: 2fr 1fr 3fr 1fr;
      }
    }
    @media (max-width: 992px) {
      .requestRow {
        grid-template-columns: 1fr 1fr 3fr;
      }
      .status {
        justify-content: center;
      }
    }
    @media (max-width: 768px) {
      .tableHeader, .requestRow {
        grid-template-columns: 1fr;
      }
      .requestRow {
        padding: 10px;
        grid-row-gap: 10px;
      }
      .status {
        text-align: center;
      }
    }
    @media (max-width: 576px) {
      .header {
        font-size: 20px;
      }
      .requestRow {
        font-size: 14px;
        padding: 8px;
      }
    }
  `;

  return (
    <div style={pageStyles.outerContainer}>
      <div style={pageStyles.container}>
        <h1 style={pageStyles.header} className="header">My Item List</h1>

        <style>{mediaQueryStyles}</style>

        {/* Table Header */}
        <div style={pageStyles.tableHeader} className="tableHeader">
          <div>Author</div>
          <div>Room</div>
          <div>Detail</div>
          <div>Status</div>
        </div>

        {/* Request Rows */}
        {requests.map((request, index) => (
          <div key={index} style={pageStyles.requestRow} className="requestRow">
            <div>{request.author}</div>
            <div>{request.room}</div>
            <div>{request.detail}</div>
            <div style={getStatusStyle(request.status)} className="status">
              <span style={pageStyles.statusText}>{request.status}</span>
              <span style={pageStyles.icon} onClick={() => console.log("Edit")}>
                ✏️
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}