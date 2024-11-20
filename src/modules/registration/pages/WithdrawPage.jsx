import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useActiveCoursesByStudentId } from "../services/queries";
import {
  useDeleteEnrollmentDetail,
  useWithdrawEnrollmentDetail,
} from "../services/mutations";
import { ErrorSkeleton } from "../styles/Skeletons";
import popToast from "../../../utils/popToast";
import LoadingPage from "../../dev/pages/LoadingPage";

function WithdrawPage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoading,
    isError,
  } = useActiveCoursesByStudentId(studentId);
  const mutation = useWithdrawEnrollmentDetail();

  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

  const handleWithdrawCourses = async () => {
    if (!selectedEnrollmentId) {
      popToast("No course selected to withdraw.", "warning");
      return;
    }

    try {
      await mutation.mutateAsync({ enrollmentDetailId: selectedEnrollmentId });
      popToast("Course Successfully Withdrawn", "success");
      queryClient.invalidateQueries("courses");
    } catch (error) {
      console.error("Error withdrawing course:", error);
      popToast(
        "Failed to withdraw the selected course. Please try again.",
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
        <HeadLineCard title="Withdraw Courses" link="/regis/course/detail" />
        <div className="divider"></div>
        <div className="p-6 bg-white rounded-md shadow-md">
          {courses?.length === 0 ? (
            <div className="py-6 text-center">
              <p>No active courses available for this student.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-gray-200 rounded-md">
              <table className="min-w-full text-left border">
                <thead className="text-center">
                  <tr className="bg-[#c3554e] text-white">
                    <th className="px-1 py-2 border border-gray-300">
                      Withdraw
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Code</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Section Data
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      Professors
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <input
                          type="radio"
                          name="course"
                          checked={selectedEnrollmentId === course.ed_id}
                          onChange={() => setSelectedEnrollmentId(course.ed_id)}
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {course.course_code}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <div>{course.section_name}</div>
                        <div>{course.section_day}</div>
                        <div>{`${course.start_time} - ${course.end_time}`}</div>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {course.professor_names}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {course.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="grid gap-2 py-4 sm:grid-cols-2">
            <button className={`${button}`} onClick={() => navigate(-1)}>
              Back
            </button>
            <button className={`${button}`} onClick={handleWithdrawCourses}>
              Withdraw Selected Course
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WithdrawPage;
