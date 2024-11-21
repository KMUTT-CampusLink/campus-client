import React from 'react'

const CourseHeader = ({c_code, c_name, c_lecturer, c_time}) => {
  return (
    <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 ">
      <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto">
        <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
          About Classroom
        </div>
        <div className="text-gray-800">
          <span className="font-semibold">Course: </span>
          {`${c_code} ${c_name}`}
        </div>
        <div className="text-gray-800">
          <span className="font-semibold">Lecturer:</span> Arjan{" "}
          {`${c_lecturer}`}
        </div>
        <div className="text-gray-800">
          <span className="font-semibold">Time:</span> {`${c_time}`}
        </div>
      </div>
    </div>
  );
}

export default CourseHeader