import React from "react";

function StatusCard() {
  return (
    <div className="flex flex-col items-start gap-4 p-5">
      {/* Card Container */}
      <div className="bg-white w-[500px] h-[200px] rounded-xl shadow-xl flex items-center p-5 gap-5">
        {/* Date Section */}
        <div className="bg-zinc-800 w-[150px] h-[150px] rounded-xl flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold">9</h1>
          <h2 className="text-2xl font-medium">Aug</h2>
        </div>

        {/* Library Status Text */}
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-black">
            Library <span className="text-orange-600">Status</span>
          </h1>
          <h1 className="text-2xl font-semibold text-green-500">OPEN</h1>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
