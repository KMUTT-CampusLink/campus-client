import { useEffect, useState } from "react";
import { useGPAXBySemesterId, useGPAXByStudentId } from "../services/queries";
import {
  CardErrorSkeleton,
  GradeCardLoadingSkeleton,
} from "../styles/Skeletons";

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

  const [gpa, setGPA] = useState(null);
  const [gpax, setGPAX] = useState(null);
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

  if (isLoading) return <GradeCardLoadingSkeleton />;
  if (isError) return <CardErrorSkeleton data="grade" />;

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="bg-[#c3554e] text-white rounded-t-lg p-4 flex justify-evenly items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-bold font-geologica">GPA</p>
          <p className="text-xl font-bold">{gpa || "N/A"}</p>
          <p className="text-xs">Semester {semester}</p>
        </div>
        <div className="h-12 mx-4 border-l border-white"></div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-bold font-geologica">GPAX</p>
          <p className="text-xl font-bold">{gpax || "N/A"}</p>
          <p className="text-xs">Overall</p>
        </div>
      </div>

      <div className="p-4 divide-y divide-gray-200">
        {courses?.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No courses available for this semester.
          </div>
        ) : (
          courses?.map((course, index) => (
            <div
              key={course.id || index}
              className="flex items-center justify-between py-3"
            >
              <div className="pr-2">
                <p className="text-sm font-bold text-[#DC5A52]">
                  {course.course_code}
                </p>
                <p className="text-lg font-semibold">{course.course_name}</p>
                <p className="text-sm text-[#B1B1B1]">
                  {course.credits} Credits
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">{course.grade_letter}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GradeCard;
