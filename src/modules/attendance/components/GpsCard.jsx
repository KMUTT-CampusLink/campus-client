// import React from 'react';

const GpsCard = () => {
  return (
    <div className="bg-#F8F8F8 shadow-lg rounded-[50px] p-6 w-[30vw] h-[60vh]" >
      <div className="flex flex-col items-center">
        <span className="text-center">Allow “App” to use</span>
        <span className="text-center">your location?</span>
      </div>

      <div className="flex justify-center my-4">
        <img
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="Location permission"
        />
      </div>

      <div className="flex justify-around mt-4">
        <button className="btn btn-primary text-white bg-[#F69800] rounded-full py-2 px-4 w-40">
          Allow
        </button>
      </div>
      <div className="flex justify-around mt-4">
        <button className="btn btn-primary text-white bg-[#F69800] rounded-full py-2 px-4 w-40">
          Deny
        </button>
      </div>
    </div>
  );
};

export default GpsCard;
