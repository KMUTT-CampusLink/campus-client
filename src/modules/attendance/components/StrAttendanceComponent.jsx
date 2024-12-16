import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAttendStudent, updateAttendance } from "../services/api";

const StAttendanceComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [student, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sectionId } = useParams();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-CA").format(date);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAttendStudent(sectionId);
        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          setError("Failed to fetch students");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [sectionId]);

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const filteredStudents = student.filter((item) => {
    const fullName = `${item.firstname} ${item.midname ? item.midname : ""} ${
      item.lastname
    }`.toLowerCase();
    const studentId = item.student_id.toLowerCase();
    const query = searchQuery.toLowerCase();

    // Check if the student's name or ID matches the search query
    const matchesQuery = fullName.includes(query) || studentId.includes(query);

    // Check if the student's attendance date matches the selected date
    const matchesDate = selectedDate
      ? formatDate(item.created_at) === selectedDate
      : true;

    return matchesQuery && matchesDate;
  });


    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

  return (
        <div className="px-4 sm:px-0">
      <hr className="border-b border-gray-300 w-full" />
      <div className="p-4 sm:p-8 lg:p-12">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#F69800]">Choose Date</span>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2"
              onChange={(e) => handleDateChange(e.target.value)}
              value={selectedDate ? formatDate(selectedDate) : ""}
            />
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search"
                className="outline-none rounded-md border border-gray-300 p-2 pl-4 pr-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <div className="flex flex-col mt-4">
            <span className="text-2xl font-bold text-[#F69800]">
              Attendance Check
            </span>
            <div className="overflow-x-auto mt-4">
              <table className="table w-full rounded-lg">
                <thead className="bg-[#F69800]">
                  <tr>
                    <th className="text-white">Date</th>
                    <th className="text-white">Student Name</th>
                    <th className="text-white">Student ID</th>
                    <th className="text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((item) => (
                      <tr key={`${item.student_id}-${item.created_at}`}>
                        <td>{item.created_at}</td>
                        <td>{`${item.firstname} ${
                          item.midname ? item.midname : ""
                        } ${item.lastname}`}</td>
                        <td>{item.student_id}</td>
                        <td>
                          <span
                            className={`font-medium ${
                              item.status === "Present"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StAttendanceComponent;