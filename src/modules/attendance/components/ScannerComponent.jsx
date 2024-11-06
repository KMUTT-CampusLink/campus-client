import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner"; // Import the qr-scanner library

const QrScannerComponent = () => {
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize QrScanner when the component mounts
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => handleScanSuccess(result),
      { highlightScanRegion: true } // Highlights the scanning area
    );

    qrScanner.start(); // Start the camera

    return () => {
      qrScanner.stop(); // Clean up by stopping the camera when component unmounts
    };
  }, []);

  // Handle successful QR scan
  const handleScanSuccess = (result) => {
    console.log("Scanned QR code:", result);
    
    let qrData = result.data; // Extract the data field from the result

    // Try to parse the data as JSON to handle cases like {"id":1062}
    try {
      const parsedData = JSON.parse(qrData);
      qrData = parsedData.id || qrData; // If JSON has "id", use it
    } catch (error) {
      console.warn("Scanned data is not in JSON format:", qrData);
    }

    setScannedData(qrData); // Set the extracted text or id
    sendScannedDataToBackend(qrData); // Send the scanned data to the backend
  };

  // Function to send the scanned QR data to the backend
  const sendScannedDataToBackend = async (qrData) => {
    console.log("Sending QR data to backend:", qrData);
    try {
      const response = await fetch(`http://localhost:3000/api/attend/validate/${qrData}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response status is not ok (e.g., 400 or 500)
      if (!response.ok) {
        const errorResult = await response.json(); // Parse the JSON error message
        console.error("Error response from backend:", errorResult.message);
        alert(errorResult.message); // Display the error message from the backend
        return;
      }
  
      // If the response is ok, parse and handle success
      const result = await response.json();
      console.log(result);
  
      if (result.success) {
        alert(result.message); // Show success message
      } else {
        alert(result.message); // Show error message from the backend
      }
    } catch (error) {
      console.error("Error sending QR data to backend:", error);
      alert("Failed to send QR data to backend. Please check the console.");
    }
  };
  

  // Handle file input (QR code image upload)
  

  return (
    <div>
      
      {/* Video element for live camera scan */}
      <video ref={videoRef} style={{ width: "300px", border: "1px solid black" }} />
      
      {/* Display scanned data */}
      {scannedData && <p>Scanned Data: {scannedData}</p>}

    </div>
  );
};

export default QrScannerComponent;
