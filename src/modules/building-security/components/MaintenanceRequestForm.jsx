import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MaintenanceRequestForm() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, type, priority, status, description });
  };

  const formStyles = {
    container: {
      maxWidth: "900px",
      margin: "100px auto",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      position: "relative",
      transform: "translateX(50px)",
    },
    header: {
      fontSize: "36px",
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
      marginBottom: "30px",
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
      padding: "20px",
      fontSize: "18px",
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
      padding: "20px",
      fontSize: "18px",
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
      padding: "20px 60px",
      borderRadius: "40px",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
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
    "@media (max-width: 768px)": {
      container: {
        padding: "20px",
        margin: "50px auto",
        transform: "translateX(0px)",
      },
      header: {
        fontSize: "28px",
      },
      formGroup: {
        flexDirection: "column",
      },
      formItemHalfWidth: {
        width: "100%",
      },
      select: {
        padding: "15px",
        fontSize: "16px",
      },
      submitBtn: {
        padding: "15px 40px",
        fontSize: "18px",
      },
    },
    "@media (max-width: 480px)": {
      container: {
        padding: "15px",
        margin: "30px auto",
      },
      header: {
        fontSize: "24px",
      },
      select: {
        padding: "12px",
        fontSize: "14px",
      },
      submitBtn: {
        padding: "12px 30px",
        fontSize: "16px",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.container}>
      <div
        style={formStyles.listButton}
        onClick={() => navigate("/security/administrator/list")}
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

      {/* Location Field on Full Width */}
      <div style={{ ...formStyles.formGroup, ...formStyles.formItemFullWidth }}>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={formStyles.select}
        >
          <option value="">Location</option>
          <option value="Building A">Building A</option>
          <option value="Building B">Building B</option>
        </select>
      </div>

      {/* Type and Priority Fields on New Line */}
      <div style={formStyles.formGroup}>
        <div style={formStyles.formItemHalfWidth}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Type</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="HVAC">HVAX</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={formStyles.formItemHalfWidth}>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Status Field */}
      <div style={formStyles.formGroup}>
        <div style={formStyles.formItemFullWidth}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={formStyles.select}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Description Textarea */}
      <div>
        <label style={formStyles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the maintenance request..."
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
