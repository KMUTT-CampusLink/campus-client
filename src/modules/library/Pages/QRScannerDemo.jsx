import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner"; // Make sure to install: `npm install qr-scanner`

function FullPageQRScanner() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const [scanResult, setScanResult] = useState("None");
  const [flashState, setFlashState] = useState("off");
  const [camHasFlash, setCamHasFlash] = useState(false);

  useEffect(() => {
    // Initialize QR Scanner
    const scanner = new QrScanner(
      videoRef.current,
      (result) => handleScanResult(result),
      {
        onDecodeError: (error) => {
          console.warn(error); // Optional: Log errors without updating scanResult
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    scannerRef.current = scanner;

    QrScanner.hasCamera().then((hasCamera) => {
      if (hasCamera) {
        startScanner();
      } else {
        console.error("No camera found on this device.");
      }
    });

    // Clean up the scanner on component unmount
    return () => {
      scanner.stop();
      scanner.destroy();
    };
  }, []);

  const handleScanResult = (result) => {
    setScanResult(result.data);
  };

  const startScanner = () => {
    scannerRef.current
      .start()
      .then(() => {
        updateFlashAvailability(); // Call after start
      })
      .catch((error) => console.error("Error starting scanner:", error));
  };
  

  const stopScanner = () => {
    scannerRef.current.stop();
  };

  const updateFlashAvailability = () => {
    if (scannerRef.current) {
      scannerRef.current.hasFlash().then((hasFlash) => {
        setCamHasFlash(hasFlash);
      });
    }
  };

  const toggleFlash = () => {
    if (scannerRef.current) {
      scannerRef.current.toggleFlash().then(() => {
        setFlashState(scannerRef.current.isFlashOn() ? "on" : "off");
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">QR Code Scanner</h1>
      <div className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
      <div className="mt-4">
        <p>
          <strong>Detected QR Code:</strong> {scanResult}
        </p>
        {camHasFlash && (
          <button
            onClick={toggleFlash}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Toggle Flash: {flashState === "on" ? "On" : "Off"}
          </button>
        )}
      </div>
      <div className="mt-4 space-x-2">
        <button
          onClick={startScanner}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start Scanner
        </button>
        <button
          onClick={stopScanner}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop Scanner
        </button>
      </div>
    </div>
  );
}

export default FullPageQRScanner;
