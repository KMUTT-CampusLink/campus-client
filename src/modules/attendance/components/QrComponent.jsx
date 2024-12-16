import { useState } from "react";
import { useParams } from "react-router-dom";
import { generateNewQr } from "../services/api";
// import ErrorCard from "./ErrorCard";
// import GpsCard from "./GpsCard";
// import SuccessCard from "./SuccessCard";

const QrComponent = () => {
  const [qrData, setQrData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //Model
  const { sectionId } = useParams();

  const handleGenerateQrButton = async (sectionId) => {
    const data = await generateNewQr(sectionId);
    console.log("Generating QR Code...");
    console.log(data);
    setQrData(data.data.qrCode);
    setIsModalOpen(true); // Show Model
  };
  
  return (
    <div className="px-0">
      <hr className="border-gray-300 w-full m-0" />
      <div className="p-4 md:p-8 pl-4 pr-4 md:pl-24 md:pr-24">
        <div className="mt-2">
        <div className="flex flex-col items-center">
        <button
          className="flex items-center justify-center text-white bg-[#F69800] font-open-sans font-normal text-lg h-[5vh] rounded-lg w-full md:w-1/3 lg:w-1/4"
          onClick={() => handleGenerateQrButton(sectionId)}
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

        {/* Model Qr Pop */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/2 max-w-sm text-center">
              <h2 className="text-xl font-semibold mb-4">QR Code</h2>
              {qrData && (
                <img
                  style={{ width: "100%" }}
                  src={qrData}
                  alt="QR Code"
                  className="mx-auto"
                />
              )}
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)} // close button
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
          {/* <GpsCard />
              <SuccessCard/>
              <ErrorCard/> */}
        </div>
      </div>
    </div>
  );
};

export default QrComponent;
