import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAttendStudent } from "../services/api";
import { getCourseHeader } from "../services/api";
const useStAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [student, setStudents] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sectionId } = useParams(); // Get sectionId from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseHeader(sectionId);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError("Failed to fetch students");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [sectionId]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAttendStudent(sectionId);
        console.log(response.data.data);
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
    { label: "Scanner", key: "Scanner" },
  ];
  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate(`/attendance/student/${sectionId}`);
    } else if (key === "Scanner") {
      navigate(`/attendance/student/${sectionId}/StQr`);
    }
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Add the actual search logic here
  };
  
  const AttendanceDetail = () => {
    if (loading) {
      return <div>Loading course details...</div>;
    }
  
    if (error) {
      return <div>Error loading course details: {error}</div>;
    }
      
    // Check if course data exists
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
        <div className="flex items-center gap-4 mt-4">
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 w-1/2"
            onChange={(e) => handleDateChange(e.target.value)}
            value={
              selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
            }
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="outline-none rounded-md border border-gray-300 p-2 pl-4 pr-10"
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
    return (
      <div className="flex flex-col mt-4">
        <span className="text-2xl font-bold text-orange-500">
          Attendance Check
        </span>
        <table className="table w-full mt-4 rounded-lg ">
          <thead className="bg-[#F69800]">
            <tr>
              <th className="text-white">Date</th>
              <th className="text-white">Student Name</th>
              <th className="text-white">Student ID</th>
              <th className="text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {student&&student.map((item) => (
              <tr key={ `${item.student_id}-${item.created_at}`} >
                <td>{item.created_at}</td>
                <td>{`${item.firstname} ${item.midname?item.midname:""} ${item.lastname}`}</td>
                <td>{item.student_id}</td>
                <td>
                  <span className={`font-medium ${ item.status === "Present" ? "text-green-500":"text-red-500"}`}>
                    {item.status}</span>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return { items, handleMenuClick, AttendanceDetail, chooseDate, table, loading, error };
};

export default useStAttendance;
