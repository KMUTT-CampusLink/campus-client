import { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useActiveCoursesByStudentId } from "../services/queries";
import { useDeleteEnrollmentDetail } from "../services/mutations";
import Alert from "../components/Alert";
import { useQueryClient } from "@tanstack/react-query";

function DropCoursePage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoading,
    isError,
    error,  // Capture the error object
  } = useActiveCoursesByStudentId(studentId);

  const mutation = useDeleteEnrollmentDetail();

  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleDropCourses = async () => {
    if (!selectedEnrollmentId) {
      setAlertMessage("No course selected to drop.");
      setAlertSeverity("error");
      setIsAlertVisible(true);
      return;
    }

    try {
      await mutation.mutateAsync({ enrollmentDetailId: selectedEnrollmentId });
      setAlertMessage("Selected course has been dropped successfully.");
      setAlertSeverity("success");
      queryClient.invalidateQueries("courses");
      setIsAlertVisible(true);
    } catch (error) {
      console.error("Error dropping course:", error);
      setAlertMessage("Failed to drop the selected course. Please try again.");
      setAlertSeverity("error");
      setIsAlertVisible(true);
    }
  };

  useEffect(() => {
    if (isAlertVisible) {
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle and display error message from the backend
  if (isError) {
    return (
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Drop Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className="bg-white p-6 shadow-md rounded-md">
            <Alert severity="error" message={error?.response?.data?.error || "Failed to load data"} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Drop Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className="bg-white p-6 shadow-md rounded-md">
            {isAlertVisible && (
              <Alert
                severity={alertSeverity}
                message={alertMessage}
                onClose={() => setIsAlertVisible(false)}
              />
            )}

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
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-gray-100"
                      >
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          <input
                            type="radio"
                            name="course"
                            checked={selectedEnrollmentId === course.ed_id}
                            onChange={() =>
                              setSelectedEnrollmentId(course.ed_id)
                            }
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
              <button
                className={`${button}`}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
              <button className={`${button}`} onClick={handleDropCourses}>
                Drop Selected Course
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DropCoursePage;