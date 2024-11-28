import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { useAllSemesters } from "../services/queries";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";

function AdminPage() {
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
        <div className="p-4 text-black bg-gray-500 rounded-md">
          <div className="mb-4 text-xl font-bold">Select Period</div>

          {/* Registration Period Selector */}
          <div>
            <select
              className="w-full max-w-xs p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
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
              className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
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
    </div>
  );
}

export default AdminPage;
