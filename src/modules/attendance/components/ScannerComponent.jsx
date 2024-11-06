import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import SuccessCard from "./SuccessCard"; // Import the SuccessCard component

const QrScannerComponent = () => {
  const [scannedData, setScannedData] = useState(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false); // State to control the SuccessCard display
  const [message, setMessage] = useState(""); // Message from backend
  const [messageType, setMessageType] = useState("success"); // Type of message: success or error
  const videoRef = useRef(null);

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => handleScanSuccess(result),
      { highlightScanRegion: true }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, []);

  const handleScanSuccess = (result) => {
    let qrData = result.data;

    try {
      const parsedData = JSON.parse(qrData);
      qrData = parsedData.id || qrData;
    } catch (error) {
      console.warn("Scanned data is not in JSON format:", qrData);
    }

    setScannedData(qrData);
    sendScannedDataToBackend(qrData);
  };

  const sendScannedDataToBackend = async (qrData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/attend/validate/${qrData}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setMessageType("success");
      } else {
        setMessage(result.message);
        setMessageType("error");
      }

      setShowSuccessCard(true); // Show the success card
    } catch (error) {
      setMessage("Failed to send QR data to backend.");
      setMessageType("error");
      setShowSuccessCard(true);
    }
  };

  const handleCloseCard = () => {
    setShowSuccessCard(false); // Hide the success card
  };

  return (
    <div>
            <video
            ref={videoRef}
            className="border-2 border-gray-500 rounded-lg max-w-full w-full max-h-[60vh] md:max-h-[80vh] object-contain"
            autoPlay/>
      {showSuccessCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SuccessCard message={message} messageType={messageType} onClose={handleCloseCard} />
        </div>
      )}
    </div>
  );
};

export default QrScannerComponent;
