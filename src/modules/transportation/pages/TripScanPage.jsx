import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const DriverPage = () => {
  const [qrResult, setQrResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null); // Ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setQrResult(result.data);
          setErrorMessage(""); // Clear any previous error
        },
        {
          onDecodeError: (error) => {
            console.error(error);
            setErrorMessage("Error scanning QR code. Try again.");
          },
          // calculateScanRegion:
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Driver, Scan students QR Code to Allow Bus Access</h1>


      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <video
          ref={videoRef}
          style={{ width: "100%", height: 300 }}
          className="rounded-lg"
        ></video>
        <div className="mt-4">
          {qrResult ? (
            <p className="text-green-700 text-lg font-medium">
              Successfully scanned:{" "}
              <span className="font-bold">{qrResult}</span>
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              Point the camera at a QR code to scan...
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPage;