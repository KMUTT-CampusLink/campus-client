import { useEffect, useState } from "react";
import { useGPAXBySemesterId, useGPAXByStudentId } from "../services/queries";

const GradeCard = ({ semester, semesterId, studentId }) => {
  const {
    data: semesterGrades,
    isLoading: isLoadingSemester,
    isError: isErrorSemester,
  } = useGPAXBySemesterId(studentId, semesterId);

  const {
    data: overallGPAXData,
    isLoading: isLoadingOverall,
    isError: isErrorOverall,
  } = useGPAXByStudentId(studentId);

  const [gpa, setGPA] = useState("");
  const [gpax, setGPAX] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (semesterGrades) {
      setGPA(semesterGrades.gpa);
      setCourses(semesterGrades.courses);
    }
    if (overallGPAXData) {
      setGPAX(overallGPAXData.gpa);
    }
  }, [semesterGrades, overallGPAXData]);

  const isLoading = isLoadingSemester || isLoadingOverall;
  const isError = isErrorSemester || isErrorOverall;

  if (isLoading)
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200 animate-pulse">
        <div className="bg-gray-200 text-white rounded-t-lg p-4 flex justify-evenly items-center">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-4 w-12 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
          <div className="h-12 mx-4"></div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-4 w-12 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="py-3 flex justify-between items-center">
            <div className="flex flex-col items-start">
              <div className="h-3 w-24 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-36 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (isError) return <div>Error Loading Grade Data.</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="bg-[#c3554e] text-white rounded-t-lg p-4 flex justify-evenly items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-geologica font-bold">GPA</p>
          <p className="text-xl font-bold">{gpa}</p>
          <p className="text-xs">Semester {semester}</p>
        </div>
        <div className="h-12 border-l border-white mx-4"></div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-geologica font-bold">GPAX</p>
          <p className="text-xl font-bold">{gpax}</p>
          <p className="text-xs">Semester {semester}</p>
        </div>
      </div>

      <div className="p-4 divide-y divide-gray-200">
        {courses.map((course, index) => (
          <div key={index} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-[#DC5A52]">
                {course.course_code}
              </p>
              <p className="text-lg font-semibold">{course.course_name}</p>
              <p className="text-sm text-[#B1B1B1]">{course.credits} Credits</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{course.grade_letter}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeCard;
