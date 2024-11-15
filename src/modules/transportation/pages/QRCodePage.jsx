import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // Import QRCode component to generate QR codes

const QRCodePage = ({ tripID }) => {
  const [id, setId] = useState(""); // State to hold the entered ID
  const [qrCode, setQrCode] = useState(""); // State to hold the generated QR code
  const [error, setError] = useState(""); // State to hold error message

  // Handle input change for ID
  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  // Generate the QR Code
  const handleGenerateQR = () => {
    if (!id) {
      setError("Please enter a valid ID");
      return;
    }
    setQrCode(id); // Set QR code data to be the ID entered by the user
    setError(""); // Clear previous error
  };

  // return (
  //   <div className="qr-page-container">
  //     <h1>Generate QR Code</h1>

  //     {/* Input to enter ID */}
  //     <div className="input-container">
  //       <input
  //         type="text"
  //         placeholder="Enter ID"
  //         value={id}
  //         onChange={handleInputChange}
  //       />
  //       <button onClick={handleGenerateQR}>Generate QR Code</button>
  //     </div>

  //     {/* Display QR Code */}
  //     {qrCode && (
  //       <div className="qr-code-container">
  //         <QRCode value={qrCode} size={256} />
  //       </div>
  //     )}

  //     {/* Display Error */}
  //     {error && <p className="error-message">{error}</p>}
  //   </div>
  // );

  return <QRCodeSVG value={tripID} size={150} />;
};

export default QRCodePage;
