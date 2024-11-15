import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";

export default function AdministratorMainPage() {
  const navigate = useNavigate();
  const styles = {
    container: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column", // Stack NavBar, title, and button container vertically
      overflow: "hidden",
    },
    content: {
      flex: 1, // This makes the content (title and buttons) take the remaining space
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      flexDirection: "column", // Stack title and buttons vertically
      marginTop: "-50px", // Move the content up by 50px
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      flexDirection: "row", // Align buttons in a row (same line)
      marginTop: "30px", // Space between title and buttons
      gap: "40px", // Space between the two buttons
    },
    button: {
      padding: "20px 40px",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Same background color
      borderRadius: "20px",
      border: "2px solid rgba(90, 60, 46, 0.8)", // Same border color for both
      fontSize: "24px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#5a3c2e", // Same text color for both
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
    },
    roombutton: {
      padding: "20px 40px",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Same background color
      borderRadius: "20px",
      border: "2px solid rgba(90, 60, 46, 0.8)", // Same border color for both
      fontSize: "24px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#5a3c2e", // Same text color for both
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
      marginTop: "100px",
      marginLeft: "50px",
    },
    title: {
      textAlign: "center",
      fontSize: "48px",
      fontWeight: "bold",
      margin: "0", // Remove extra margin
      marginBottom: "50px", // Adjust spacing between title and buttons
      fontFamily: "Arial, sans-serif",
      color: "#5a3c2e", // Text color
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adds a shadow for depth
      WebkitTextStroke: "2px white", // Outline with white border
    },
    background: {
      backgroundImage: `url('/building-security/MainPageBackGround.png')`, // Placeholder image from Unsplash
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -1,
    },
  };

  return (
    <>
      <div style={styles.container}>
        {/* NavBar at the top */}
        <NavBar />

        {/* Background */}
        <div style={styles.background}></div>

        {/* Main content (Title and buttons centered) */}
        <div style={styles.content}>
          <h1 style={styles.title}>ADMINISTER</h1>

          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => navigate("/security/administrator/request")}
            >
              Maintenance Requests
            </button>
            <button
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => navigate("/security/administrator/lostandfoundform")}
            >
              Lost and Found
            </button>
          </div>
          <div>
            <button
              style={styles.roombutton}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => navigate("/security/administrator/mybooking")}
            >
              Room Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
