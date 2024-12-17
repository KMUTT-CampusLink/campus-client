import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from 'react-qr-code'
import { makeReservation } from '../../../library/services/api.js';

const Booking = ({bookdata}) => {
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const downloadQRCode = () => {
    const svg = document.getElementById("QRCode");
    if (!svg) {
      console.error("SVG element with ID 'QRCode' not found.");
      return;
    }
  
    const svgData = new XMLSerializer().serializeToString(svg);
  
    // Convert SVG to a Blob and use FileReader to load as data URL
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
  
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 700;
      canvas.height = 800;
  
      const ctx = canvas.getContext("2d");
  
      // White background for the receipt
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Header text
      ctx.fillStyle = "#000000";
      ctx.font = "bold 25px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Your Reserved Book", canvas.width / 2, 40);
  
      // Book details
      ctx.textAlign = "left";
      ctx.font = "20px Arial";
      ctx.fillText(`Title: ${bookdata.title}`, 20, 120);
      ctx.fillText(`Author: ${bookdata.author}`, 20, 140);
      ctx.fillText(`ID: ${bookdata.bdid}`, 20, 160);
      ctx.fillText(`Category: ${bookdata.category_id}`, 20, 180);
  
      // Reservation dates
      const today = new Date();
      const returnDate = new Date(today);
      returnDate.setDate(today.getDate() + 7);
  
      ctx.fillText(`Reserved Date: ${today.toLocaleDateString()}`, 20, 200);
      ctx.fillText(`Return Date: ${returnDate.toLocaleDateString()}`, 20, 220);
  
      // QR code
      const qrSize = 200;
      ctx.drawImage(img, (canvas.width - qrSize) / 2, 240, qrSize, qrSize);
  
      // Footer text
      ctx.textAlign = "center";
      ctx.font = "20px Arial";
      ctx.fillText(
        "Scan the QR code to view or manage your reservation",
        canvas.width / 2,
        480
      );
  
      // Convert canvas to PNG and trigger download
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Receipt_${bookdata.bdid}_${bookdata.title}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
  
      // Revoke the Blob URL
      URL.revokeObjectURL(url);
    };
  
    img.src = url; // Load the SVG blob as an image
  };
  
  const generateUnlockCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let unlockCode = "";
    for (let i = 0; i < 7; i++) {
      unlockCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return unlockCode;
  };

  const handleReservation = async () => {
    if (!bookdata.bdid) {
      console.error("No matching book duplicate found or status is not true.");
      return;
    }

    setIsLoading(true); // Set loading to true to disable the button

    const unlockCode = generateUnlockCode(); // Generate the 7-digit unlock code

    const reservationData = {
      status: "Reserved",
      book_duplicate_id: bookdata.bdid,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      unlock_code: unlockCode, // Add the unlock code to the reservation data
    };

    try {
      const response = await makeReservation(reservationData); // Use the API function
      console.log("Reservation successful:", response);
      downloadQRCode(); // Download the QR code after successful reservation

      // Navigate to MyBook page after QR code download
    //   navigate("../library/mybook");
    } catch (error) {
      console.error("Error during reservation:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
      document.getElementById("my_modal_4").close(); // Close modal after confirmation
    }
  };

  useEffect(() => {
      const today = new Date();
      const formattedToday = today.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      setTodayDate(formattedToday);
  
      const returnDay = new Date();
      returnDay.setDate(today.getDate() + 7);
      const formattedReturnDate = returnDay.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      setReturnDate(formattedReturnDate);
    }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="btn m-6 bg-orange-500 text-white border-orange-600 hover:bg-orange-600"
              >
                Reserve
              </button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl text-center mb-4">
                    Confirmation
                  </h3>

                  <p className="text-center mb-2">
                    Your book <strong>{bookdata.title}</strong> has been reserved. <br />
                    Reserved Date
                    <span className="text-orange-600 font-semibold block">
                      {todayDate}
                    </span>
                  </p>

                  <div className="border border-orange-500 bg-orange-100 text-orange-700 p-4 rounded-lg text-center mb-4">
                    If not returned by <strong>{returnDate}</strong>, you will
                    be banned from accessing our library.
                  </div>

                  <p className="text-center mb-4">
                    Use QR Code below to scan when returning the reserved book.{" "}
                    <span className="text-gray-900 font-semibold">
                      {" "}
                      It will automatically download after confirmation
                    </span>
                  </p>

                  <div className="flex justify-center mb-6 p-4 bg-white rounded-lg">
                    <QRCode 
                      id="QRCode"
                      value={
                        bookdata.bdid
                          ? bookdata.bdid.toString()
                          : "No ID available"
                      }
                      size={160}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"
                    />
                  </div>

                  <div className="modal-action flex justify-center gap-3">
                    <button
                      onClick={handleReservation}
                      disabled={isLoading} // Disable when loading
                      className={`btn bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? "Processing..." : "Confirm"}
                    </button>

                    <button
                      onClick={() =>
                        document.getElementById("my_modal_4").close()
                      }
                      className="btn px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </dialog>
    </div>
  )
}

export default Booking