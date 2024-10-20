import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import SectionTablePopup from "../components/SectionTablePopup";
import {
  useCourseBySearch,
  useGetEnrollmentHead,
  useSectionByCourseCode,
} from "../services/queries";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { ErrorSkeleton, LoadingSkeleton } from "../styles/Skeletons";

function AddCoursePage() {
  const studentId = localStorage.getItem("studentId");
  const currentSemesterId = 2;
  const navigate = useNavigate();

  const [headId, setHeadId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);
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

  const { data: sectionData, refetch: refetchSections } =
    useSectionByCourseCode(courseCode);
  const { data: courses, refetch } = useCourseBySearch(searchTerm);

  useEffect(() => {
    if (enrollmentHeadData) {
      setHeadId(enrollmentHeadData.head_id);
    }
  }, [enrollmentHeadData]);

  useEffect(() => {
    if (sectionData) {
      setSelectedSections(sectionData);
    }
  }, [sectionData]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setHasSearched(true);
    refetch();
  };

  const handleRowClick = (courseCode) => {
    setCourseCode(courseCode);
    setIsPopupOpen(true);
  };

  const handleSectionAdded = () => {
    refetchSections();
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorSkeleton />;

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Add Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className="bg-white p-6 shadow-md rounded-md">
            <label className="mb-4 flex items-center gap-2 border px-2 rounded-lg">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by course name or code"
                className="p-2 w-full max-w-md focus:outline-none"
              />
            </label>

            <div className="bg-gray-200 rounded-md p-4">
              <div className="bg-blue-100 text-center p-4 rounded-md mb-4">
                <p>
                  Welcome to the Course Search! Use the search bar above to find
                  courses.
                </p>
              </div>

              {hasSearched && courses?.length > 0 ? (
                <div className="bg-gray-200 rounded-md p-4 grid grid-cols-1 gap-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(course.code)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-[#DC5A52]">
                          Course Code: {course.code}
                        </h3>
                        <span className="text-gray-600 text-sm">
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
                <div className="bg-orange-300 text-blue-800 text-center p-4 rounded-md mt-4">
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
        sections={selectedSections}
        studentId={studentId}
        headId={headId}
        onSectionAdded={handleSectionAdded}
      />
    </>
  );
}

export default AddCoursePage;
