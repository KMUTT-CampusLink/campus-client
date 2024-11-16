const SuccessCard = ({ message, messageType, onClose }) => {
  const isSuccess = messageType === "success";

  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-4 sm:w-[80vw] md:w-[50vw] lg:w-[30vw] sm:h-[40vh] md:h-[35vh] lg:h-[30vh] relative ${
        isSuccess ? "text-green-600" : "text-red-600"
      }`}
    >
      <div className="flex justify-center mb-4">
        {isSuccess ? (
          // Checkmark icon for success
          <svg
            width="50"
            height="50"
            viewBox="0 0 82 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          >
            <path
              d="M40.5684 6.75C22.0059 6.75 6.81836 21.9375 6.81836 40.5C6.81836 59.0625 22.0059 74.25 40.5684 74.25C59.1309 74.25 74.3184 59.0625 74.3184 40.5C74.3184 21.9375 59.1309 6.75 40.5684 6.75ZM33.8184 57.375L16.9434 40.5L21.7021 35.7413L33.8184 47.8237L59.4346 22.2075L64.1934 27L33.8184 57.375Z"
              fill="#0FA958"
            />
          </svg>
        ) : (
          // X mark icon for error
          <svg
            width="50"
            height="50"
            viewBox="0 0 82 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          >
            <circle cx="40.5684" cy="40.5" r="33.75" fill="#FF0000" />
            <line x1="30" y1="30" x2="51" y2="51" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <line x1="51" y1="30" x2="30" y2="51" stroke="white" strokeWidth="5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div className="flex justify-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
        <span>{isSuccess ? "SUCCESS!" : "ERROR!"}</span>
      </div>

      <div className="flex justify-center text-center px-4 mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
        <span>{message}</span>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={`rounded-full py-1 px-3 sm:w-[40vw] md:w-[20vw] lg:w-[12vw] cursor-pointer ${
            isSuccess ? "bg-green-600" : "bg-red-600"
          } text-white`}
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessCard;
