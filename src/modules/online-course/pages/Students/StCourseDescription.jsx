import NavForIndvCourse from "../../components/NavForIndvCourse";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionIDForStudent } from "../../services/queries";
import CourseHeader from "../../components/CourseHeader";

const StCourseDescription = () => {
  const {state } = useLocation();

  const [sec_id, setSec_id] = useState(() => {
    return state?.sec_id || localStorage.getItem("sec_id");
  });

  useEffect(() => {
    if (sec_id) {
      localStorage.setItem("sec_id", sec_id);
    }
  }, [sec_id]);

  const { data: details } = useCourseHeaderBySectionIDForStudent(sec_id);
  console.log(details);

  const description = details?.description;

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"description"} />

      {/* About Classroom Section */}
     <CourseHeader 
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />
      {/* Course Description Section */}
      <div className="py-8 w-full max-md:text-xs">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto flex max-md:gap-3 gap-10 items-center mb-4">
          <div className="text-2xl font-bold text-[#ecb45e]">
            Course Description
          </div>
        </div>
        <div className="max-md:w-full max-md:px-2 w-3/4 mx-auto text-gray-700 leading-relaxed">
          <p>{description}</p>
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="py-8 bg-white max-md:text-xs px-2">
        <div className="max-md:w-full w-3/4 mx-auto text-2xl font-bold text-[#ecb45e] mb-4">
          Learning Outcomes
        </div>
        <div className="max-md:w-full w-3/4 mx-auto text-gray-700 leading-relaxed">
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
