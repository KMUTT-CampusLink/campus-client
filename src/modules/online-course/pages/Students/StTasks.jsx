import React, { useCallback, useMemo, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import EditSubmissionPopup from "../../components/EditSubmission_Popup";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionIDForStudent } from "../../services/queries";
import { useEffect } from "react";
import CourseHeader from "../../components/CourseHeader";

const StTasks = () => {
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpData, setPopUpData] = useState(null);
  const [tasks, setTasks] = useState([
    {
      title: "Exercise 1.1",
      date: "12/4/2024",
      due_date: "12/4/2024 at 11:59 PM",
      attachments: ["66130500801-Akari Kyaw Thein"],
    },
    {
      title: "Exercise 1.2 (individual)",
      date: "12/5/2024",
      due_date: "17/4/2024 at 11:59 PM",
      attachments: ["66130500801-Akari Kyaw Thein"],
    },
  ]);
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }, [tasks]);

  const handleEdit = (data) => {
    setIsPopupOpen(true);
    setPopUpData(data);
  };
  console.log(isPopupOpen);
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <NavForIndvCourse page={"tasks"} />
      <div className="max-md:pt-1 pt-6 pb-4">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>


      <div className="max-sm:text-sm max-md:pt-2 pt-6 pb-8 mb-3 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:px-4">
        <div className="max-md:w-full w-3/4 mx-auto">
          <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e]">
            Tasks
          </div>
        </div>

        <div className="w-full border-b-[1px] border-gray-300">
          <div className="max-md:w-full w-3/4 mx-auto grid grid-cols-3 sm:grid-cols-4 gap-4 font-bold py-2 px-2">
            <div>Title</div>
            <div className="hidden sm:block">Publish Date</div>
            <div>Due Date</div>
            <div>Submission</div>
          </div>
        </div>

        <div className="max-md:w-full w-3/4 mx-auto">
          {sortedTasks.map((task, index) => (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4"
            >
              <div>{task.title}</div>
              <div className="hidden sm:block">{task.date}</div>
              <div>{task.due_date}</div>
              <div className="flex flex-col justify-center items-center gap-2">
                <button
                  className="flex gap-2 sm:gap-5 items-center w-[100%] justify-center rounded-lg shadow-lg p-2 bg-[#D9D9D9]"
                  onClick={() => handleEdit(task)}
                >
                  <span className="font-[700] text-[14px] sm:text-[18px]">
                    Edit Submission
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} color="#D4A015" />
                </button>
                <button className="flex sm:text-[18px] text-[14px] gap-4 w-[95%] items-center justify-center rounded-lg shadow-lg p-1 bg-white">
                  Access score/feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {isPopupOpen && (
        <EditSubmissionPopup
          onClose={() => setIsPopupOpen(!isPopupOpen)}
          data={popUpData}
        />
      )}
    </div>
  );
};

export default StTasks;
