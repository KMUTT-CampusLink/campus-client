import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const useStAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statuses, ] = useState([
    {
      date: "2024-10-12",
      studentName: "John Brown",
      studentId: "S12345",
      status: "Present",
    },
    {
      date: "2024-10-12",
      studentName: "Jim Green",
      studentId: "S12346",
      status: "Absent",
    },
  ]);
  const navigate = useNavigate();

  const items = [
    { label: "Attendance", key: "Attendance" },
    { label: "QR CODE", key: "QR CODE" },
  ];

  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate("/attendance");
    } else if (key === "QR CODE") {
      navigate("/attendance/qr");
    }
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Add the actual search logic here
  };

  const AttendanceDetail = () => (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-orange-500">
        About Classroom
      </span>
      <div className="text-lg font-semibold">
        <div>CSC-230 Computer Architecture & Design</div>
        <div>Lecturer - Arjan xxxxxxxx</div>
        <div>Time - 1:30 to 4:30 PM (Thursday)</div>
      </div>
    </div>
  );

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
    // const data = [
    //   {
    //     date: "2024-10-12",
    //     studentName: "John Brown",
    //     studentId: "S12345",
    //     status: "Present",
    //   },
    //   {
    //     date: "2024-10-12",
    //     studentName: "Jim Green",
    //     studentId: "S12346",
    //     status: "Absent",
    //   },
    // ];

    // const [statuses, setStatuses] = useState(data);

    // const handleStatusChange = (index, newStatus) => {
    //   const updatedStatuses = [...statuses];
    //   updatedStatuses[index].status = newStatus;
    //   setStatuses(updatedStatuses);
    // };

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
            {statuses.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.studentName}</td>
                <td>{row.studentId}</td>
                <td className="flex justify-between">
                  {/* Show Status in corresponding color */}
                  <span
                    className={`${
                      row.status === "Present"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </span>

                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return { items, handleMenuClick, AttendanceDetail, chooseDate, table };
};

export default useStAttendance;
