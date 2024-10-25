import { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to make API calls

const useQr = () => {
  const [h1] = useState("QR Page");
  const [qrData, setQrData] = useState(null); // State to store the QR code data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  const items = [
    { label: "Attendance", key: "Attendance" },
    { label: "QR CODE", key: "QR CODE" },
  ];

  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate("/attendance");
    } else if (key === "QR CODE") {
      navigate("/attendance/qr");
    }
  };

  const fetchQrCode = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:3000/api/qr-code"); // Replace with your API endpoint
      setQrData(response.data); // Set the QR code data from the response
    } catch (error) {
      console.error("Error fetching QR code data:", error); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const detail = () => {
    return (
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-orange-500">
          About Classroom
        </span>
        <div className="text-lg font-semibold">
          <div>CSC-230 Computer Architecture & Design</div>
          <div>Lecturer - Arjan xxxxxxxx</div>
          <div>Time - 1:30 to 4:30 PM (Thursday)</div>
        </div>
      </div>
    );
  };

  const qrButton = () => {
    return (
      <div>
        <button
          className="flex items-center justify-center text-white bg-[#F69800] font-open-sans font-normal text-lg h-[5vh] rounded-lg w-1/6"
          onClick={fetchQrCode} // Call fetchQrCode on button click
        >
          Generate QR CODE
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#1A1B1E] h-6 w-6 ml-2"
          >
            <path
              d="M19.75 0.5H2.25C1.78587 0.5 1.34075 0.684374 1.01256 1.01256C0.684374 1.34075 0.5 1.78587 0.5 2.25V19.75C0.5 20.2141 0.684374 20.6592 1.01256 20.9874C1.34075 21.3156 1.78587 21.5 2.25 21.5H19.75C20.2141 21.5 20.6592 21.3156 20.9874 20.9874C21.3156 20.6592 21.5 20.2141 21.5 19.75V2.25C21.5 1.78587 21.3156 1.34075 20.9874 1.01256C20.6592 0.684374 20.2141 0.5 19.75 0.5ZM17.125 11.875H11.875V17.125C11.875 17.3571 11.7828 17.5796 11.6187 17.7437C11.4546 17.9078 11.2321 18 11 18C10.7679 18 10.5454 17.9078 10.3813 17.7437C10.2172 17.5796 10.125 17.3571 10.125 17.125V11.875H4.875C4.64294 11.875 4.42038 11.7828 4.25628 11.6187C4.09219 11.4546 4 11.2321 4 11C4 10.7679 4.09219 10.5454 4.25628 10.3813C4.42038 10.2172 4.64294 10.125 4.875 10.125H10.125V4.875C10.125 4.64294 10.2172 4.42038 10.3813 4.25628C10.5454 4.09219 10.7679 4 11 4C11.2321 4 11.4546 4.09219 11.6187 4.25628C11.7828 4.42038 11.875 4.64294 11.875 4.875V10.125H17.125C17.3571 10.125 17.5796 10.2172 17.7437 10.3813C17.9078 10.5454 18 10.7679 18 11C18 11.2321 17.9078 11.4546 17.7437 11.6187C17.5796 11.7828 17.3571 11.875 17.125 11.875Z"
              fill="#1A1B1E"
            />
          </svg>
        </button>

        {loading && <p>Loading...</p>} {/* Show loading message if fetching data */}

        {qrData && (
          <div className="mt-4">
            <img src={qrData} alt="QR Code" /> {/* Display the fetched QR code */}
          </div>
        )}
      </div>
    );
  };

  return {
    h1,
    items,
    handleMenuClick,
    detail,
    qrButton,
  };
};

export default useQr;
