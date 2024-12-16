import React from 'react'

const CourseHeader = ({ c_code, c_name, c_lecturer, c_time }) => {
  return (

    <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx">
      <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto p-4">
        <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e]">
          About Classroom
        </div>
        <div className="text-gray-800 mt-4 space-y-2">
          <div>
            <span className="font-semibold text-[#4a5568]">Course: </span>
            <span className="font-medium">{`${c_code} ${c_name}`}</span>
          </div>
          <div>
            <span className="font-semibold text-[#4a5568]">Lecturer: </span>
            <span className="font-medium">Arjan {`${c_lecturer}`}</span>
          </div>
          <div>
            <span className="font-semibold text-[#4a5568]">Time: </span>
            <span className="font-medium">{`${c_time}`}</span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CourseHeader