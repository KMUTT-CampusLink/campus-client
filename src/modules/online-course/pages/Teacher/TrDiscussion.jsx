import React from 'react'
import NavForIndvCourse from '../../components/NavForIndvCourse';

const TrDiscussion = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"discussion"} />

      <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
            About Classroom
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Course:</span> CSC-230 Computer
            Architecture & Design
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Lecturer:</span> Arjan
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Time:</span> 1:30 to 4:30 PM
            (Thursday)
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrDiscussion