import { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faVideo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionID } from "../../services/queries";

const TrCourseMaterials = () => {
  const sec_id = localStorage.getItem("sec_id");

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  console.log(details);

  const [materials, setMaterials] = useState([
    {
      title: "Lecture 1 - Introduction",
      date: "12/4/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)", "(2 hr 10 minutes)"], // Multiple recordings
    },
    {
      title: "Lecture 2 - Data Representation",
      date: "12/5/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)"],
    },
  ]);

  return (
    <div className="max-md:text-xs w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"materials"} />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ecb45e]">MATERIALS</div>
        </div>
        <div>
          <span>Video: </span>
          <input
            type="file"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default TrCourseMaterials;
