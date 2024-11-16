import React, { useState, useEffect } from "react";
import { getBuilding, getFloor, getRoom } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LostAndFoundForm() {
  const navigate = useNavigate();
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [request, setRequest] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Listen to window resize to change the form styles accordingly
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleBuilding();
    handleFloor();
    handleRoom();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBuilding = async() => {
    const data = await getBuilding()
     console.log(data)
     setBuilding(data.data)
  }
  const handleFloor = async() => {
    const data = await getFloor()
     console.log(data)
     setFloor(data.data)
  }
  const handleRoom = async() => {
    const data = await getRoom()
     console.log(data)
     setRoom(data.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh on submit
    console.log({ building, room, floor, request });
    // You can add further logic to handle form data submission (API calls, etc.)
  };

  const isMobile = windowWidth <= 768;
  const isLaptop = windowWidth > 768 && windowWidth <= 1199;

  // Inline style object with responsive design
  const formStyles = {
    container: {
      maxWidth: isMobile ? "90%" : isLaptop ? "70%" : "900px", // Adjust width based on screen size
      margin: "100px 0 100px 22%",//***Chang the box on the middle on this */ */
      padding: isMobile ? "20px" : "40px", // Adjust padding for mobile
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      position: "relative",
    },
    header: {
      fontSize: isMobile ? "28px" : isLaptop ? "32px" : "36px", // Responsive font size
      fontWeight: "bold",
      color: "#000",
      marginBottom: "10px",
      textAlign: "left",
    },
    formGroup: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Stack inputs vertically on mobile
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "30px",
    },
    formItemFullWidth: {
      width: "100%",
      marginBottom: "20px",
    },
    formItemHalfWidth: {
      width: isMobile ? "100%" : "48%", // Full width for mobile, half for larger screens
      marginBottom: "20px",
    },
    select: {
      width: "100%",
      padding: isMobile ? "15px" : "20px", // Adjust padding for mobile
      fontSize: isMobile ? "16px" : "18px", // Adjust font size for mobile
      borderRadius: "30px",
      border: "1px solid #ccc",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      appearance: "none",
      background:
        "#f5f5f5 url(\"data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23333' d='M2 0L0 2h4z'/></svg>\") no-repeat right 20px center",
      backgroundSize: "16px 16px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: isMobile ? "15px" : "20px",
      fontSize: isMobile ? "16px" : "18px",
      borderRadius: "15px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      outline: "none",
      boxSizing: "border-box",
    },
    submitBtn: {
      backgroundColor: "#8b5b34",
      color: "white",
      padding: isMobile ? "15px 40px" : "20px 60px", // Adjust button size for mobile
      borderRadius: "40px",
      border: "none",
      cursor: "pointer",
      fontSize: isMobile ? "18px" : "20px", // Smaller font for mobile
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
      marginTop: "20px",
    },
    listButton: {
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
    icon: {
      width: "30px",
      height: "30px",
    },
    label: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#333",
      textAlign: "left", // Ensures the text is aligned to the left
      display: "block",
      marginBottom: "10px",
      width: "100%", // Takes up full width of the container
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
          onClick={() => navigate("/security/administrator/lostandfoundlist")} 
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      <h1 style={formStyles.header}>Lost And Found</h1>
      <hr />
      <br />

      {/* Building Field on Full Width */}
      <div style={{ ...formStyles.formGroup, ...formStyles.formItemFullWidth }}>
        <select
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          style={formStyles.select}
        >
          {/* <option value="">Building</option>
          <option value="Building 1">Building 1</option> */}
          {/* <option value="Building 2">Building 2</option> */}
          {building&&building.map((building) => (
            <option key={building.id} value={building.name}>
              {building.name}
            </option>
          ))}
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
            {/* <option value="">Room No.</option>
            <option value="Room 101">Room 101</option>
            <option value="Room 102">Room 102</option> */}
            {room&&room.map((room) => (
            <option key={room.id} value={room.name}>
              {room.name}
            </option>
          ))}
          </select>
        </div>

        <div style={formStyles.formItemHalfWidth}>
          <select
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Status</option>
            <option value="Found">Found</option>
            <option value="Searching">Searching</option>
          </select>
        </div>
      </div>

      {/* Textarea for Request */}
      <div>
        <label style={formStyles.label}>Details :</label>
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