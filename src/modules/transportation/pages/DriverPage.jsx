import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const DriverPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setError(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Unable to access camera or scan QR code. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Driver QR Code Reader
      </h1>
      <div className="bg-white shadow-lg p-6 rounded-md flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-80 h-80 bg-gray-200 rounded-lg">
          <QrReader
            onResult={(result, error) => {
              if (!!result) handleScan(result.text);
              if (!!error) handleError(error);
            }}
            constraints={{ facingMode: "environment" }}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="mt-6 text-center">
          {scanResult ? (
            <p className="text-green-600 font-semibold">
              ✅ Scan Result: {scanResult}
            </p>
          ) : (
            <p className="text-gray-600">Scan a QR code to see the result.</p>
          )}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DriverPage;
