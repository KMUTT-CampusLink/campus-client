import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useActiveCoursesByStudentId } from "../services/queries";
import { useDeleteEnrollmentDetail } from "../services/mutations";
import { ErrorSkeleton } from "../styles/Skeletons";
import popToast from "../../../utils/popToast";
import LoadingPage from "../../dev/pages/LoadingPage";

function DropCoursePage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoading,
    isError,
  } = useActiveCoursesByStudentId(studentId);
  const mutation = useDeleteEnrollmentDetail();

  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

  const handleDropCourses = async () => {
    if (!selectedEnrollmentId) {
      popToast("No course selected to drop.", "warning");
      return;
    }

    try {
      await mutation.mutateAsync({ enrollmentDetailId: selectedEnrollmentId });
      popToast("Course Successfully Dropped", "success");
      queryClient.invalidateQueries("courses");
    } catch (error) {
      console.error("Error dropping course:", error);
      popToast(
        "Failed to drop the selected course. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorSkeleton />;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="Drop Courses" link="/regis/course/detail" />
        <div className="divider"></div>
        <div className="bg-white p-6 shadow-md rounded-md">
          {courses?.length === 0 ? (
            <div className="text-center py-6">
              <p>No active courses available for this student.</p>
            </div>
          ) : (
            <div className="bg-gray-200 rounded-md overflow-x-auto">
              <table className="min-w-full text-left border">
                <thead>
                  <tr className="bg-[#c3554e] text-white">
                    <th className="py-2 px-4 border border-gray-300">Drop</th>
                    <th className="py-2 px-4 border border-gray-300">Code</th>
                    <th className="py-2 px-4 border border-gray-300">
                      Section Data
                    </th>
                    <th className="py-2 px-4 border border-gray-300">
                      Professors
                    </th>
                    <th className="py-2 px-4 border border-gray-300">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="py-2 px-4 border border-gray-300 text-center">
                        <input
                          type="radio"
                          name="course"
                          checked={selectedEnrollmentId === course.ed_id}
                          onChange={() => setSelectedEnrollmentId(course.ed_id)}
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.course_code}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <div>{course.section_name}</div>
                        <div>{course.section_day}</div>
                        <div>{`${course.start_time} - ${course.end_time}`}</div>
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.professor_names}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-2 py-4">
            <button className={`${button}`} onClick={() => navigate(-1)}>
              Back
            </button>
            <button className={`${button}`} onClick={handleDropCourses}>
              Drop Selected Course
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DropCoursePage;
