import { useState } from "react";
import NavBar from "../components/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useNavigate } from "react-router-dom";

function DropCoursePage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    { id: 1, courseName: "Data Structures", credit: 3, condition: "Completed" },
    { id: 2, courseName: "Algorithms", credit: 3, condition: "In Progress" },
    { id: 3, courseName: "Databases", credit: 3, condition: "Completed" },
    {
      id: 4,
      courseName: "Integrated Project",
      credit: 1,
      condition: "Completed",
    },
  ]);

  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDropCourses = () => {
    setCourses((prev) => prev.filter((course) => !selectedCourses[course.id]));
    setSelectedCourses({});
  };

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Drop Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className=" bg-white p-6 shadow-md rounded-md">
            <div className="bg-gray-200 rounded-md overflow-x-auto">
              <table className="min-w-full text-left border">
                <thead>
                  <tr className="bg-[#c3554e] text-white">
                    <th className="py-2 px-4 border border-gray-300">Drop</th>
                    <th className="py-2 px-4 border border-gray-300">No</th>
                    <th className="py-2 px-4 border border-gray-300">
                      Course Name
                    </th>
                    <th className="py-2 px-4 border border-gray-300">Credit</th>
                    <th className="py-2 px-4 border border-gray-300">
                      Condition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="py-2 px-4 border border-gray-300">
                        <input
                          type="checkbox"
                          checked={!!selectedCourses[course.id]}
                          onChange={() => handleCheckboxChange(course.id)}
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.id}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.courseName}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.credit}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {course.condition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <button className={`${button}`} onClick={handleDropCourses}>
                Drop Selected Courses
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DropCoursePage;
