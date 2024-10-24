import React, { useState } from "react";

export default function MaintenanceRequestForm() {
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ building, room, floor, request });
  };

  // Inline style object for responsive design
  const formStyles = {
    container: {
      maxWidth: "900px", // Form width
      margin: "100px auto", // Center form vertically and horizontally
      padding: "40px", // Padding inside the form
      backgroundColor: "#ffffff",
      borderRadius: "20px", // Rounded corners
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Shadow for depth
      textAlign: "center",
      position: "relative",
      transform: "translateX(50px)", // Push the form further to the right
    },
    header: {
      fontSize: "36px", // Font size for title
      fontWeight: "bold",
      color: "#000",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "30px",
    },
    formGroup: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "30px", // Spacing between inputs
    },
    formItemFullWidth: {
      width: "100%",
      marginBottom: "20px",
    },
    formItemHalfWidth: {
      width: "48%",
      marginBottom: "20px",
    },
    select: {
      width: "100%",
      padding: "20px", // Larger padding for fields
      fontSize: "18px", // Larger font size
      borderRadius: "30px", // Rounded corners
      border: "1px solid #ccc",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      appearance: "none",
      background:
        "#f5f5f5 url(\"data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23333' d='M2 0L0 2h4z'/></svg>\") no-repeat right 20px center", // Dropdown icon
      backgroundSize: "16px 16px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "20px", // Larger padding for textarea
      fontSize: "18px", // Larger font size
      borderRadius: "15px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      outline: "none",
      boxSizing: "border-box",
    },
    label: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#333",
      textAlign: "left",
      display: "block",
      marginBottom: "10px",
    },
    submitBtn: {
      backgroundColor: "#8b5b34",
      color: "white",
      padding: "20px 60px", // Larger button
      borderRadius: "40px", // Rounded button
      border: "none",
      cursor: "pointer",
      fontSize: "20px", // Larger font size for button text
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
      marginTop: "20px",
    },
    listButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "60px", // Size of the list button
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
    icon: {
      width: "30px", // Larger icon for the list button
      height: "30px",
    },
    // Media queries for responsive design
    "@media (max-width: 768px)": {
      container: {
        padding: "20px", // Reduce padding for smaller screens
        margin: "50px auto", // Adjust margin for tablets
        transform: "translateX(0px)", // Center it back on smaller screens
      },
      header: {
        fontSize: "28px", // Reduce header size for smaller screens
      },
      formGroup: {
        flexDirection: "column", // Stack form fields vertically
      },
      formItemHalfWidth: {
        width: "100%", // Full width form fields on small screens
      },
      select: {
        padding: "15px", // Adjust padding for inputs
        fontSize: "16px", // Adjust font size for inputs
      },
      submitBtn: {
        padding: "15px 40px", // Adjust button size for smaller screens
        fontSize: "18px", // Adjust font size for button
      },
    },
    "@media (max-width: 480px)": {
      container: {
        padding: "15px", // Reduce padding for mobile devices
        margin: "30px auto", // Smaller vertical margin on mobile
      },
      header: {
        fontSize: "24px", // Further reduce header size on mobile
      },
      select: {
        padding: "12px", // Smaller padding for inputs on mobile
        fontSize: "14px", // Smaller font size for inputs on mobile
      },
      submitBtn: {
        padding: "12px 30px", // Smaller button on mobile
        fontSize: "16px", // Smaller button text
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.container}>
      {/* List Button */}
      <div
        style={formStyles.listButton}
        onClick={() => console.log("Menu clicked")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={formStyles.icon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      <h1 style={formStyles.header}>My Maintenance Requests</h1>
      <p style={formStyles.subtitle}>Detailed information</p>

      {/* Building Field on Full Width */}
      <div style={{ ...formStyles.formGroup, ...formStyles.formItemFullWidth }}>
        <select
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          style={formStyles.select}
        >
          <option value="">Building</option>
          <option value="Building 1">Building 1</option>
          <option value="Building 2">Building 2</option>
        </select>
      </div>

      {/* Room No. and Floor Fields on New Line */}
      <div style={formStyles.formGroup}>
        <div style={formStyles.formItemHalfWidth}>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Room No.</option>
            <option value="Room 101">Room 101</option>
            <option value="Room 102">Room 102</option>
          </select>
        </div>

        <div style={formStyles.formItemHalfWidth}>
          <select
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Floor</option>
            <option value="Floor 1">Floor 1</option>
            <option value="Floor 2">Floor 2</option>
          </select>
        </div>
      </div>

      {/* Textarea for Request */}
      <div>
        <label style={formStyles.label}>My Request is :</label>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Type something..."
          style={formStyles.textarea}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" style={formStyles.submitBtn}>
        Submit
      </button>
    </form>
  );
}
