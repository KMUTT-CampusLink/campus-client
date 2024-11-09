import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { useAllSemesters } from "../services/queries";
import FooterCard from "../components/FooterCard";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";

function AdminPage() {
  const studentId = localStorage.getItem("studentId");
  const { data: semesters, isLoading, isError } = useAllSemesters();

  const [semester, setSemester] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    if (semesters && semesters.length > 0) {
      const firstSemester = semesters[0];
      setSemester(firstSemester.name);
      setSemesterId(firstSemester.id);
    }
  }, [semesters]);

  const handleSemesterChange = (event) => {
    const selectedSemester = semesters.find(
      (sem) => sem.name === event.target.value
    );
    if (selectedSemester) {
      setSemester(selectedSemester.name);
      setSemesterId(selectedSemester.id);
      console.log(semester);
      console.log(semesterId);
    }
  };
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="bg-gray-500 text-black">
          <div className="mx-auto mt-4 mb-6 md:ml-6">
            <label className="block mb-2 font-semibold font-georama">
              <FontAwesomeIcon icon={faCalendarWeek} className="px-2" />
              Select Semester
            </label>
            <select
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs"
              value={semester}
              onChange={handleSemesterChange}
            >
              <option disabled>Select Academic year [x/xxxx]</option>
              {semesters?.map((sem, index) => (
                <option key={index} value={sem.semester_name}>
                  {sem.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
      <FooterCard />
    </div>
  );
}

export default AdminPage;
