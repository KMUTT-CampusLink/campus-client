import NavBar from "../components/NavBarComponents/NavBar";
import SInfoCard from "../components/SInfoCard";
import GradeCard from "../components/GradeCard";
import HeadLineCard from "../components/HeadLineCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { mainStyles, containerDivStyles } from "../styles/styles";
import { useSemestersByStudentId } from "../services/queries";

function GradePage() {
  const studentId = localStorage.getItem("studentId");
  const {
    data: semesters,
    isLoading,
    isError,
  } = useSemestersByStudentId(studentId);

  const [semester, setSemester] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    if (semesters && semesters.length > 0) {
      const firstSemester = semesters[0];
      setSemester(firstSemester.semester_name);
      setSemesterId(firstSemester.semester_id);
    }
  }, [semesters]);

  const handleSemesterChange = (event) => {
    const selectedSemester = semesters.find(
      (sem) => sem.semester_name === event.target.value
    );
    if (selectedSemester) {
      setSemester(selectedSemester.semester_name);
      setSemesterId(selectedSemester.semester_id);
    }
  };

  if (isError) return <div>Error Loading Semester Data.</div>;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="My Past Grade Results" link="/regis/transcript" />
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-6 shadow-md rounded-md">
          <div className="flex flex-col justify-start">
            <SInfoCard />
            {isLoading ? (
              <div className="mx-auto mt-4 mb-6 md:ml-6 w-3/4 animate-pulse">
                <div className="block mb-2 h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="border rounded-md p-2 w-full h-10 bg-gray-200"></div>
              </div>
            ) : (
              <div className="mx-auto mt-4 mb-6 md:ml-6">
                <label className="block mb-2 font-semibold font-georama">
                  <FontAwesomeIcon icon={faCalendarWeek} className="px-2" />
                  Select Academic Year
                </label>
                <select
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs"
                  value={semester}
                  onChange={handleSemesterChange}
                >
                  <option disabled>Select Academic year [x/xxxx]</option>
                  {semesters.map((sem, index) => (
                    <option key={index} value={sem.semester_name}>
                      {sem.semester_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div>
            <GradeCard
              studentId={studentId}
              semester={semester}
              semesterId={semesterId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default GradePage;
