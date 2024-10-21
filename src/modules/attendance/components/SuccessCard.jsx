// import React from 'react';

const SuccessCard = () => {
    return (
      <div className="bg-white shadow-lg rounded-[50px] p-5 w-[30vw] h-[40vh]">
        <div className="flex justify-center mb-4">
          <svg
            width="82"
            height="81"
            viewBox="0 0 82 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.5684 6.75C22.0059 6.75 6.81836 21.9375 6.81836 40.5C6.81836 59.0625 22.0059 74.25 40.5684 74.25C59.1309 74.25 74.3184 59.0625 74.3184 40.5C74.3184 21.9375 59.1309 6.75 40.5684 6.75ZM33.8184 57.375L16.9434 40.5L21.7021 35.7413L33.8184 47.8237L59.4346 22.2075L64.1934 27L33.8184 57.375Z"
              fill="#0FA958"
            />
          </svg>
        </div>
  
        <div className="flex justify-center text-green-600">
          <span className="font-bold text-2xl">SUCCESS!</span>
        </div>
  
        <div className="flex justify-center">
          <span>QR Successfully Scanned!</span>
        </div>
  
        <div className="flex justify-center mt-4">
          <button className="bg-green-600 text-white rounded-full py-2 px-4 w-[15vw] cursor-pointer">
            Continue
          </button>
        </div>
      </div>
    );
  };
  
  export default SuccessCard;
  