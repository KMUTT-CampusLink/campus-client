import { useState } from "react";
import NavBar from "../components/NavBar";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useNavigate } from "react-router-dom";

function AddCoursePage() {
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
  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Add Courses" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className=" bg-white p-6 shadow-md rounded-md">
            <label className="mb-6 input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <div className="bg-gray-200 rounded-md overflow-x-auto">
              <table className="min-w-full text-left border">
                <thead>
                  <tr className="bg-[#c3554e] text-white">
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
              <button className={`${button}`}>Add Selected Courses</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddCoursePage;
