import React from 'react'
import NavForIndvCourse from '../../components/NavForIndvCourse';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import CourseHeader from '../../components/CourseHeader';
import { useCourseHeaderBySectionID } from '../../services/queries';

const TrTaskSubmission = () => {
  
  const sec_id = localStorage.getItem("sec_id");
  const { data: details } =useCourseHeaderBySectionID(sec_id);

const SubmittedStudents = [
  {
    name: "Akari Kyaw Thein",
    id: "66130500801",
    file: "66130500801-Akari Kyaw Thein",
    status: "On Time",
    score: 10,
    feedback: "Good",
  },
  {
    name: "Nay Chi Lin Lei",
    id: "66130500817",
    file: "66130500817-Nay Chi Lin Lei",
    status: "Late",
    score: 8,
    feedback: "Average",
  },
  {
    name: "Gulf Kana Traipattanpong",
    id: "66130500802",
    file: "66130500802-Gulf Kana",
    status: "On Time",
    score: 10,
    feedback: "Good",
  },
  {
    name: "Daniel Bawm Ying",
    id: "66130500802",
    file: "66130500802-Gulf Kana",
    status: "On Time",
    score: 10,
    feedback: "Good",
  },
];

    const location = useLocation();
  const { task } = location.state || {};
  const getStatusColor = (status) => {
    if (status === "On Time") return "#6ae65f";
    if (status === "Late") return "#e5d35b";
    if (status === "Absent") return "red";
    return "gray";
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"tasks"} />

      {/* <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
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
      </div> */}
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-2xl font-bold text-[#ecb45e]">TASKS</div>
          <div className="font-bold text-2xl">{task.title} </div>
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

      <div className="max-md:text-sm max-sm:text-xs text-lg font-bold grid max-md:grid-cols-5 grid-cols-6 justify-items-center border-b-2 border-b-gray-300">
        <div className="max-md:hidden">Student name</div>
        <div>Student ID</div>
        <div>File Upload</div>
        <div>Status</div>
        <div>Score</div>
        <div>Feedback</div>
      </div>

      {SubmittedStudents.map((student) => (
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
            <FontAwesomeIcon
              icon={faSquare}
              color={getStatusColor(student.status)}
            />
          </div>
          <div className="">{student.score}/10</div>
          <div>{student.feedback}</div>
        </div>
      ))}
    </div>
  );
}

export default TrTaskSubmission