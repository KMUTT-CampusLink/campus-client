import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { useAllSemesters } from "../services/queries";
import FooterCard from "../components/FooterCard";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";

function AdminPage() {
  const studentId = localStorage.getItem("studentId");
  const { data: semesters } = useAllSemesters();

  const [semester, setSemester] = useState(""); // Selected semester name
  const [semesterId, setSemesterId] = useState(""); // Selected semester ID
  const [regis, setRegis] = useState(""); // Registration period status

  useEffect(() => {
    // Default to the first semester if available
    if (semesters && semesters.length > 0) {
      const firstSemester = semesters[0];
      setSemester(firstSemester.name);
      setSemesterId(firstSemester.id);
    }
  }, [semesters]);

  // Handle change in registration period
  const handlePeriod = (event) => {
    setRegis(event.target.value); // Update registration period based on the selection
    console.log(regis);
  };

  // Handle semester change and update semester state
  const handleSemesterChange = (event) => {
    const selectedSemester = semesters.find(
      (sem) => sem.name === event.target.value
    );
    if (selectedSemester) {
      setSemester(selectedSemester.name);
      setSemesterId(selectedSemester.id);
    }
  };

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="bg-gray-500 text-black p-4 rounded-md">
          <div className="text-xl font-bold mb-4">Select Period</div>

          {/* Registration Period Selector */}
          <div>
            <select
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs mb-4"
              value={regis}
              onChange={handlePeriod}
            >
              <option disabled>Select Registration Period</option>
              <option value="registration">Registration Period</option>
              <option value="late">Late Registration Period</option>
              <option value="no">No Registration Period</option>
              <option value="withdraw">Withdraw Period</option>
            </select>
          </div>

          {/* Semester Selector */}
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
                <option key={index} value={sem.name}>
                  {sem.name} {/* Displaying the name of each semester */}
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
