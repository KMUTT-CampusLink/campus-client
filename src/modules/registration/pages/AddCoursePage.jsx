import { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useCourseBySearch, useSectionByCourseCode } from "../services/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SectionTablePopup from "../components/SectionTablePopup";

function AddCoursePage() {
  const studentId = localStorage.getItem("studentId");
  const headId = 1003;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);
  const [courseCode, setCourseCode] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: sectionData, refetch: refetchSections } =
    useSectionByCourseCode(courseCode);
  const { data: courses, refetch } = useCourseBySearch(searchTerm);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setHasSearched(true);
    refetch();
  };

  const handleRowClick = (courseCode) => {
    setCourseCode(courseCode);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (sectionData) {
      setSelectedSections(sectionData);
    }
  }, [sectionData]);

  const handleSectionAdded = () => {
    // Refetch section data after a section is added
    refetchSections();
  };

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

            <div className="grid sm:grid-cols-2 gap-2 py-4">
              <button
                className={`${button}`}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
              <button className={`${button}`}>Add Selected Courses</button>
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
        onSectionAdded={handleSectionAdded} // Pass the refetch callback
      />
    </>
  );
}

export default AddCoursePage;
