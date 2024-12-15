import NavForIndvCourse from "../../components/NavForIndvCourse";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionIDForStudent } from "../../services/queries";
import CourseHeader from "../../components/CourseHeader";

const StCourseDescription = () => {
  const { state } = useLocation();

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
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
      <NavForIndvCourse page={"description"} />

      {/* About Classroom Section */}
      <div className="py-8">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>

      <div className="py-8 max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx">
        {/* Course Description Section */}
        <div className="py-8 max-md:w-full max-md:ml-2 w-3/4 mx-auto p-4">
          <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e]">
            Course Description
          </div>
          <div className="text-gray-800 mt-4 leading-relaxed">
            <p>{description}</p>
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <div className="py-8 max-md:w-full max-md:ml-2 w-3/4 mx-auto p-4">
          <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e]">
            Learning Outcomes
          </div>
          <div className="text-gray-800 mt-4 leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li>Understand the architecture of modern computer systems.</li>
              <li>Analyze the functioning of the control unit and CPU.</li>
              <li>Apply Boolean algebra and digital logic in computing problems.</li>
              <li>Explore the design and organization of instruction sets.</li>
              <li>Evaluate the performance of different processor architectures.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StCourseDescription;
