import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAttendStudent, getCourseHeader, updateAttendance } from "../services/api";

const useAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [student, setStudents] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sectionId } = useParams();
  const navigate = useNavigate();

  // Fetch course header data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseHeader(sectionId);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError("Failed to fetch course details");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [sectionId]);

  // Fetch student attendance data
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

  const items = [
    { label: "Attendance", key: "Attendance" },
    { label: "QR CODE", key: "QR CODE" },
    { label: "Face Attendance", key: "Face Attendance" },
  ];

  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate(`/attendance/professor/${sectionId}`);
    } else if (key === "QR CODE") {
      navigate(`/attendance/professor/${sectionId}/profQr`);
    } else if(key == "Face Attendance"){
      navigate(`/attendance/professor/${sectionId}/faceAttendance`)
    }
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const AttendanceDetail = () => {
    if (loading) {
      return <div>Loading course details...</div>;
    }

    if (error) {
      return <div>Error loading course details: {error}</div>;
    }

    if (!course || !course.course || !course.professor) {
      return <div>No course data available</div>;
    }

    return (
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-orange-500">About Classroom</span>
        <div className="text-lg font-semibold">
          <div>
            <div>{course.course.code} {course.course.name}</div>
            {course.professor.map((prof, index) => (
              <div key={index}>
                Lecturer - {`${prof.employee.firstname} ${prof.employee.lastname}`}
              </div>
            ))}
            <div>
              Time - {moment(course.start_time).format("h:mm A")} to {moment(course.end_time).format("h:mm A")} ({course.day})
            </div>
          </div>
        </div>
      </div>
    );
  };

  const chooseDate = () => {
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-orange-500">Choose Date</span>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2"
            onChange={(e) => handleDateChange(e.target.value)}
            value={selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""}
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
    );
  };

  const table = () => {
    const handleStatusChange = async (sectionId, studentId, status, created_at) => {
      try {
        // update the status in the backend
        const response = await updateAttendance(parseInt(sectionId), studentId, status, created_at);
        if (response.data.success) {
          // update the status locally
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.student_id === studentId && student.created_at === created_at
                ? { ...student, status } // Update status
                : student // Keep others unchanged
            )
          );
        } else {
          console.error("Failed to update attendance status:", response.data.message);
        }
      } catch (err) {
        console.error("Error updating attendance:", err.response?.data?.message || err.message);
      }
    };
    const filteredStudents = student.filter((item) => {
      const fullName = `${item.firstname} ${item.midname ? item.midname : ""} ${item.lastname}`.toLowerCase();
      const studentId = item.student_id.toLowerCase();
      const query = searchQuery.toLowerCase();

      // Check if the student's name or ID matches the search query
      const matchesQuery = fullName.includes(query) || studentId.includes(query);

      // Check if the student's attendance date matches the selected date
      const matchesDate = selectedDate
        ? moment(item.created_at).format("YYYY-MM-DD") === selectedDate
        : true;

      return matchesQuery && matchesDate;
    });

    return (
      <div className="flex flex-col mt-4">
        <span className="text-2xl font-bold text-orange-500">Attendance Check</span>
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
                <tr key={ `${item.student_id}-${item.created_at}`} >
                  <td>{item.created_at}</td>
                  <td>{`${item.firstname} ${item.midname ? item.midname : ""} ${item.lastname}`}</td>
                  <td>{item.student_id}</td>
                  <td>
                    <span
                      className={`font-medium ${
                        item.status === "Present" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                    <div className="relative dropdown dropdown-left">
                      <label tabIndex={0} className="cursor-pointer">
                        <svg
                          width="30"
                          height="26"
                          viewBox="0 0 30 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.88 5.24806L21.445 8.33772M8.75 7.58372H5C4.66848 7.58372 4.35054 7.69786 4.11612 7.90103C3.8817 8.10419 3.75 8.37974 3.75 8.66706V19.5004C3.75 19.7877 3.8817 20.0633 4.11612 20.2664C4.35054 20.4696 4.66848 20.5837 5 20.5837H18.75C19.0815 20.5837 19.3995 20.4696 19.6339 20.2664C19.8683 20.0633 20 19.7877 20 19.5004V14.6254M23.0113 3.88956C23.2455 4.09247 23.4313 4.33339 23.558 4.59855C23.6848 4.86371 23.75 5.14791 23.75 5.43493C23.75 5.72195 23.6848 6.00616 23.558 6.27132C23.4313 6.53648 23.2455 6.77739 23.0113 6.98031L14.4562 14.3946L10 15.1671L10.8913 11.305L19.4463 3.89064C19.6802 3.68756 19.958 3.52644 20.2639 3.41651C20.5698 3.30658 20.8976 3.25 21.2287 3.25C21.5599 3.25 21.8877 3.30658 22.1936 3.41651C22.4995 3.52644 22.7773 3.68756 23.0113 3.89064V3.88956Z"
                            stroke="#864E41"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 overflow-hidden"
                      >
                        <li>
                          <a
                            className="text-green-500"
                            onClick={() => handleStatusChange(sectionId, item.student_id, "Present", item.created_at)}
                          >
                            Present
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-red-500"
                            onClick={() => handleStatusChange(sectionId, item.student_id, "Absent", item.created_at)}
                          >
                            Absent
                          </a>
                        </li>
                      </ul>
                    </div>
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
    );
  };
  return {
    items,
    handleMenuClick,
    AttendanceDetail,
    chooseDate,
    table,
    loading,
    error,
  };
};

export default useAttendance;
