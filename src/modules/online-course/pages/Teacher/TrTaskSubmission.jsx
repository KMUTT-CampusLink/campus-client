import React from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import { useCourseHeaderBySectionID, useStudentSubmission } from "../../services/queries";

const TrTaskSubmission = () => {
  const sec_id = localStorage.getItem("sec_id");
  const location = useLocation();
  const { task } = location.state || {}; // Retrieve task from navigation state

  const { data: details, isLoading: isHeaderLoading, error: headerError } = useCourseHeaderBySectionID(sec_id);
  const { data: submittedStudents, isLoading: isStudentsLoading, error: studentsError } = useStudentSubmission(sec_id, task?.id);

  const getStatusColor = (status) => {
    if (status === "On Time") return "#6ae65f";
    if (status === "Late") return "#e5d35b";
    if (status === "Absent") return "red";
    return "gray";
  };

  if (!task?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Task ID is missing. Please navigate back and select a valid task.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"tasks"} />

      {/* Course Header */}
      {isHeaderLoading ? (
        <div className="text-center py-4">Loading course details...</div>
      ) : headerError ? (
        <div className="text-center text-red-500 py-4">Error loading course details: {headerError.message}</div>
      ) : (
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      )}

      {/* Task Info */}
      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-2xl font-bold text-[#ecb45e]">TASKS</div>
          <div className="font-bold text-2xl">{task?.title || "Untitled Task"}</div>
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="#66b052" />
              <span>On Time</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="#e5d35b" />
              <span>Late</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="red" />
              <span>Absent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Table Header */}
      <div className="max-md:text-sm max-sm:text-xs text-lg font-bold grid max-md:grid-cols-5 grid-cols-6 justify-items-center border-b-2 border-b-gray-300">
        <div className="max-md:hidden">Student name</div>
        <div>Student ID</div>
        <div>File Upload</div>
        <div>Status</div>
        <div>Score</div>
        <div>Feedback</div>
      </div>

      {/* Submission List */}
      {isStudentsLoading ? (
        <div className="text-center py-4">Loading submissions...</div>
      ) : studentsError ? (
        <div className="text-center text-red-500 py-4">Error loading submissions: {studentsError.message}</div>
      ) : submittedStudents?.length > 0 ? (
        submittedStudents.map((student) => (
          <div
            key={student.id}
            className="max-md:pl-3 font-bold max-md:text-sm max-sm:text-xs text-lg grid max-md:grid-cols-5 max-md:gap-5 justify-items-center grid-cols-6 justify-center "
          >
            <div className="max-md:hidden justify-self-start">
              <div className="max-lg:pl-1 lg:pl-14">{student.name}</div>
            </div>
            <div className="">{student.id}</div>
            <div className="text-[#ecb45e] lg:max-w-[16rem] max-md:max-w-12">
              <FontAwesomeIcon icon={faFile} color="red" className="pr-2" />
              {student.file}
              <FontAwesomeIcon icon={faDownload} color="red" className="pl-2" />
            </div>
            <div className="">
              <FontAwesomeIcon icon={faSquare} color={getStatusColor(student.status)} />
            </div>
            <div className="">{student.score}/10</div>
            <div>{student.feedback}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">No submissions found for this task.</div>
      )}
    </div>
  );
};

export default TrTaskSubmission;
