import React from 'react';

const CourseHeader = ({ c_code, c_name, c_lecturer, c_time }) => {
  return (

    <div className="w-full p-4">
    <div className="text-2xl font-extrabold pb-3 text-orange-500 border-b-2 border-[#ecb45e]">
      About Classroom
    </div>
    <div className="text-gray-800 mt-4 space-y-2 text-left">
      <div>
        <span className="font-semibold text-[#4a5568]">Course: </span>
        <span className="font-medium">CSC555 Biology & Life Redundance</span>
      </div>
      <div>
        <span className="font-semibold text-[#4a5568]">Lecturer: </span>
        <span className="font-medium">Arjan</span>
      </div>
      <div>
        <span className="font-semibold text-[#4a5568]">Time: </span>
        <span className="font-medium">14.00</span>
      </div>
    </div>
  </div>
  



  );
};

export default CourseHeader;
