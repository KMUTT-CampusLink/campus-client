import React from "react";

const CenteredBox = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div
        className="bg-white w-1/2 shadow-lg rounded-2xl mt-12 p-6 overflow-auto"
        style={{ height: "700px" }} // Adjust height as needed
      >
        {children}
      </div>
    </div>
  );
};

export default CenteredBox;
