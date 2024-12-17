import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import SuccessCard from "./SuccessCard";
import { axiosInstance } from "../../../utils/axiosInstance"; // Ensure this import is correct

const ScannerComponent = () => {
  const [scannedData, setScannedData] = useState(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isCooldown, setIsCooldown] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        if (!isCooldown) handleScanSuccess(result); // Prevent processing during cooldown
      },
      { highlightScanRegion: true }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, [isCooldown]);

  const handleScanSuccess = (result) => {
    console.log("Scan detected:", result.data);

    let qrData = result.data;

    try {
      const parsedData = JSON.parse(qrData);
      qrData = parsedData.id || qrData;
    } catch (error) {
      console.warn("Scanned data is not in JSON format:", qrData);
    }

    setScannedData(qrData);
    sendScannedDataToBackend(qrData);

    // Set cooldown
    setIsCooldown(true);
    console.log("Cooldown started");
    setTimeout(() => {
      setIsCooldown(false);
      console.log("Cooldown ended");
    }, 5000); // Cooldown duration: 5 seconds
  };

  const sendScannedDataToBackend = async (qrData) => {
    try {
      console.log("Sending request with qrData:", qrData); // Log qrData being sent
      const response = await axiosInstance.get(`/attend/validate/${qrData}`);

      if (response.status === 200) {
        const result = response.data;
        setMessage(result.message);
        setMessageType("success");
      } else {
        setMessage("Error validating QR code.");
        setMessageType("error");
      }

      setShowSuccessCard(true); // Show the success card
    } catch (error) {
      console.error("Error sending QR data:", error);
      if (error.response) {
        console.error("Error response from server:", error.response);
        setMessage(`Error: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setMessage("Failed to send QR data to backend.");
      }
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
        autoPlay
      />
      {showSuccessCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SuccessCard message={message} messageType={messageType} onClose={handleCloseCard} />
        </div>
      )}
    </div>
  );
};

export default ScannerComponent;
