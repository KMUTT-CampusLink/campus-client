import React from "react";

export default function MyItemList() {
  const requests = [
    {
      author: "Chawisa",
      item: "Backpack",
      room: "CB305",
      detail: "It's pink backpack with my name",
      status: "Found",
    },
    {
      author: "Chawisa",
      item: "Slipper",
      room: "CB306",
      detail: "It's pink backpack with my name",
      status: "Received",
    },
    {
      author: "Chawisa",
      item: "Phone",
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
    container: {
      maxWidth: "1300px",
      margin: "50px auto",
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
      gridTemplateColumns: "2fr 2fr 1fr 4fr 1fr",
      fontWeight: "bold",
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "10px",
      lineHeight: "1.5",
    },
    requestRow: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr 1fr 4fr 1fr",
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

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>My Item List</h1>

      {/* Table Header */}
      <div style={pageStyles.tableHeader}>
        <div>Author</div>
        <div>Items</div>
        <div>Room</div>
        <div>Detail</div>
        <div>Status</div>
      </div>

      {/* Request Rows */}
      {requests.map((request, index) => (
        <div key={index} style={pageStyles.requestRow}>
          <div>{request.author}</div>
          <div>{request.item}</div>
          <div>{request.room}</div>
          <div>{request.detail}</div>
          <div style={getStatusStyle(request.status)}>
            <span style={pageStyles.statusText}>{request.status}</span>
            <span style={pageStyles.icon} onClick={() => console.log("Edit")}>
              ✏️
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}