import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import SectionTablePopup from "../components/SectionTablePopup";
import { useCourseBySearch, useGetEnrollmentHead } from "../services/queries";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { ErrorSkeleton } from "../styles/Skeletons";
import LoadingPage from "../../dev/pages/LoadingPage";
function AddCoursePage() {
  const studentId = localStorage.getItem("studentId");
  const currentSemesterId = localStorage.getItem("semesterId");
  const navigate = useNavigate();

  const [headId, setHeadId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseCode, setCourseCode] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: enrollmentHeadData,
    isError,
    isLoading,
  } = useGetEnrollmentHead({
    studentId,
    currentSemesterId,
  });

  const { data: courses, refetch } = useCourseBySearch(searchTerm);

  useEffect(() => {
    if (enrollmentHeadData) {
      setHeadId(enrollmentHeadData.head_id);
    }
  }, [enrollmentHeadData]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setHasSearched(true);
    refetch();
  };

  const handleRowClick = (courseCode) => {
    setCourseCode(courseCode);
    setIsPopupOpen(true);
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorSkeleton />;

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Add Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className="p-6 bg-white rounded-md shadow-md">
            <label className="flex items-center gap-2 px-2 mb-4 border rounded-lg">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by course name or code"
                className="w-full max-w-md p-2 focus:outline-none"
              />
            </label>

            <div className="p-4 bg-gray-200 rounded-md">
              <div className="p-4 mb-4 text-center bg-blue-100 rounded-md">
                <p>
                  Welcome to the Course Search! Use the search bar above to find
                  courses.
                </p>
              </div>

              {hasSearched && courses?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 p-4 bg-gray-200 rounded-md">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRowClick(course.code)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-[#DC5A52]">
                          Course Code: {course.code}
                        </h3>
                        <span className="text-sm text-gray-600">
                          Credits: {course.credits}
                        </span>
                      </div>
                      <p className="text-gray-800">
                        <strong>Course Name:</strong> {course.name}
                      </p>
                      <p className="text-gray-600">
                        <strong>Condition:</strong> {course.condition}
                      </p>
                    </div>
                  ))}
                </div>
              ) : hasSearched && courses?.length === 0 ? (
                <div className="p-4 mt-4 text-center text-blue-800 bg-orange-300 rounded-md">
                  <p>
                    No courses found. Please try searching with a different
                    course name or course code.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="my-4">
              <button className={`${button}`} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </main>
      </div>

      <SectionTablePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        courseCode={courseCode}
        studentId={studentId}
        semesterId={currentSemesterId}
        headId={headId}
      />
    </>
  );
}

export default AddCoursePage;
