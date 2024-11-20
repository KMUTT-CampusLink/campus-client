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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Driver Page</h1>
      <p className="text-gray-600 mb-8">Scan students' QR codes below</p>

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

// import React, { useState } from "react";
// import QrScanner from "qr-scanner";

// const DriverPage = () => {
//   const [qrResult, setQrResult] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleScan = (data) => {
//     if (data) {
//       setQrResult(data.text || data);
//       setErrorMessage(""); // Clear any previous error
//     }
//   };

//   const handleError = (error) => {
//     console.error(error);
//     setErrorMessage("Error accessing camera or scanning the QR code.");
//   };

//   const previewStyle = {
//     height: 300,
//     width: "100%",
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Driver Page</h1>
//       <p className="text-gray-600 mb-8">Scan students' QR codes below</p>

//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
//         <QrScanner
//           delay={300}
//           style={previewStyle}
//           onError={handleError}
//           onScan={handleScan}
//         />
//         <div className="mt-4">
//           {qrResult ? (
//             <p className="text-green-700 text-lg font-medium">
//               Successfully scanned:{" "}
//               <span className="font-bold">{qrResult}</span>
//             </p>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Point the camera at a QR code to scan...
//             </p>
//           )}
//           {errorMessage && (
//             <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverPage;
