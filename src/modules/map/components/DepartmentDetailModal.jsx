import { useState, useEffect } from "react";
import ModalDetailOption from "./ModalDetailOption";
import ModalLostAndFound from "./ModalLostAndFound";
import ModalParking from "./ModalParking";
import ModalClub from "./ModalClub";

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
    ) : activeIndex === 2 ? (
      <ModalParking subData={data} />
    ) : (
      <ModalClub buildingId={data?.id} />
    );

  if (!isOpen) return null;

  return (
    <div className="modal modal-open" onClick={handleBackdropClick}>
      <div
        className="modal-box relative xl:p-10 lg:p-8 lg:px-10 xl:px-14 w-[70%] h-[75%] md:h-[65vh] md:w-[75%]  lg:w-[75%] xl:w-[50vw] overflow-hidden flex flex-col transition-all duration-700 ease-in-out transform scale-90 animate-modal-fade"
        style={{ maxWidth: "none", maxHeight: "none" }}
      >
        <div className="flex h-[10vh] mx-[5%] my-auto mx-auto w-[90%]">
          <div
            className={`${data.zone.includes("S") ? "bg-[#FF4612]" : "bg-[#DCC625]"
              } rounded-full p-1 px-2 md:p-0 z-20  h-full aspect-square flex text-white `}
          >
            <h1 className="m-auto text-base md:text-2xl ">{data?.zone}</h1>
          </div>
          <div className="flex -ml-10 -mr-10 bg-gray-400/20 rounded-xl w-[90%] my-auto mx-auto h-max pl-[17%] md:pl-[10%] py-2 relative">
            <h2 className="font-semibold md:text-base text-[0.55rem] text-center flex my-auto  mx-auto">
              {data?.name}
            </h2>
          </div>
        </div>
        <div className="flex border-b-2 mt-12 mb-1 text-gray-500/85 text-xs md:text-base font-semibold overflow-x-scroll">
          <button
            onClick={() => handleButtonClick(0)}
            className={`px-6 py-2 pb-6 align-middle leading-[1] transition-all duration-300 md:flex-grow lg:flex-none ${activeIndex === 0
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
              }`}
          >
            Details
          </button>
          <button
            onClick={() => handleButtonClick(1)}
            className={`px-6 py-2 pb-6 align-middle leading-[1] transition-all duration-300 md:flex-grow lg:flex-none ${activeIndex === 1
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
              }`}
          >
            Lost and Found
          </button>
          <button
            onClick={() => handleButtonClick(2)}
            className={`px-6 py-2 pb-6 align-middle leading-[1] transition-all duration-300 md:flex-grow lg:flex-none ${activeIndex === 2
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
              }`}
          >
            Parking
          </button>
          <button
            onClick={() => handleButtonClick(3)}
            className={`px-6 py-2 pb-6 align-middle leading-[1] transition-all duration-300 md:flex-grow lg:flex-none ${activeIndex === 3
                ? "text-[#FF4612] border-b-[#FF4612] border-b-4"
                : ""
              }`}
          >
            Clubs
          </button>
        </div>
        <div className="h-full overflow-hidden">{Component}</div>
      </div>
    </div>
  );
};

export default DepartmentDetailModel;
