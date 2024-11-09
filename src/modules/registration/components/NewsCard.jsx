import React from "react";

function NewsCard() {
  return (
    <div className="bg-green-300">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">NewsCard</h2>
        <span className="text-sm text-gray-800">View More</span>
      </div>
      <div>
        <div className="bg-red-200 h-10"></div>
      </div>
    </div>
  );
}

export default NewsCard;
