import { useState, useEffect } from "react";
import ModalDetailOption from "./modalDetailOption";
import ModalLostAndFound from "./ModalLostAndFound";
import ModalParking from "./ModalParking";

const DepartmentDetailModel = ({ isOpen, onClose, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0); // Reset activeIndex when modal is closed
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  const Component =
    activeIndex === 0 ? (
      <ModalDetailOption subData={data} />
    ) : activeIndex === 1 ? (
      <ModalLostAndFound subData={data} />
    ) : (
      <ModalParking subData={data} />
    );

  if (!isOpen) return null;

  return (
    <div className="modal modal-open" onClick={handleBackdropClick}>
      <div
        className="modal-box relative p-10 px-14 overflow-hidden flex flex-col transition-all duration-700 ease-in-out transform scale-90 animate-modal-fade"
        style={{ width: "50vw", maxWidth: "none", height: "72vh", maxHeight:"72vh" }}
      >
        <div className="flex bg-gray-400/20 rounded-xl w-[90%] mx-auto h-[10%]">
          <div
            className={`${
              data.zone.includes("S") ? "bg-[#DCC625]" : "bg-[#FF4612]"
            } scale-125 rounded-full mr-4 w-[9%] h-auto aspect-square flex text-white`}
          >
            <h1 className="m-auto text-2xl">{data?.zone}</h1>
          </div>
          <div className="m-auto">
            <h2 className="font-semibold text-center flex my-auto">
              {data?.name}
            </h2>
          </div>
        </div>
        <div className="flex border-b-2 mt-12 mb-1 text-gray-500/85 font-semibold">
          <button
            onClick={() => handleButtonClick(0)}
            className={`px-6 py-2 align-middle leading-[1] transition-all duration-300 ${
              activeIndex === 0
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
            }`}
          >
            Details
          </button>
          <button
            onClick={() => handleButtonClick(1)}
            className={`px-6 py-2 align-middle leading-[1] transition-all duration-300 ${
              activeIndex === 1
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
            }`}
          >
            Lost and Found
          </button>
          <button
            onClick={() => handleButtonClick(2)}
            className={`px-6 py-2 align-middle leading-[1] transition-all duration-300 ${
              activeIndex === 2
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
            }`}
          >
            Parking
          </button>
        </div>
        <div className="h-full">{Component}</div>
      </div>
    </div>
  );
};

export default DepartmentDetailModel;
