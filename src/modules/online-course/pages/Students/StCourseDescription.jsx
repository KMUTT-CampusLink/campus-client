import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const StCourseDescription = ({ sideOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "Computer systems, processor, memory and input/output modules, interconnections among these major components, central processing unit, control unit, registers, arithmetic and logic unit, and instruction unit, data representation, Boolean algebra, digital logic, architectural issues, instruction-set design, organizational issues, pipelining, parallel organization, multiple processors and vector processing organizations, performance measurements."
  );
  

  return (
    <div
      className="min-h-screen"
    >
      <NavForIndvCourse page={"description"} />

      <div className="pt-12 border-b-2 border-black pb-8">
        <div className="w-3/4 m-auto">
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

      <div className="py-8 w-full">
        <div className="w-3/4 mx-auto flex gap-10 items-center mb-4">
          <div className="text-2xl font-bold text-[#ecb45e]">
            Course Description
          </div>
        </div>
        <div className="w-3/4 mx-auto text-gray-700 leading-relaxed">
          <p>{description}</p>
        </div>
      </div>

      <div className="py-8 bg-white">
        <div className="w-3/4 mx-auto text-2xl font-bold text-[#ecb45e] mb-4">
          Learning Outcomes
        </div>
        <div className="w-3/4 mx-auto text-gray-700 leading-relaxed">
          <ul className="list-disc list-inside">
            <li>Understand the architecture of modern computer systems.</li>
            <li>Analyze the functioning of the control unit and CPU.</li>
            <li>
              Apply Boolean algebra and digital logic in computing problems.
            </li>
            <li>Explore the design and organization of instruction sets.</li>
            <li>
              Evaluate the performance of different processor architectures.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StCourseDescription;