import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";
import CourseTable from "../components/CourseTable";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import { useActiveCoursesByStudentId } from "../services/queries";

function CourseRegisPage() {
  const studentId = localStorage.getItem("studentId");
  const {
    data: courses,
    isLoading,
    isError,
  } = useActiveCoursesByStudentId(studentId);


  const totalCredits = Array.isArray(courses)?courses.reduce(
    (acc, course) => acc + course.credits,
    0
  ):0;
  const totalCourses = courses?.length;
  const grandTotal = 52500;
  if (isError) return <div>Error Loading Student Data.</div>;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="My Courses" link="/regis/course/detail" />
        <div className="divider"></div>

        <div className="bg-white p-6 shadow-md rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <SInfoCard />
              <div className="ml-6 mt-4">
                {isLoading ? (
                  <div className="mt-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div>
                      Total Credits:{" "}
                      <span className="font-bold">{totalCredits}</span>
                    </div>
                    <div>
                      Total Courses:{" "}
                      <span className="font-bold">{totalCourses}</span>
                    </div>
                    <div>
                      Grand Total:{" "}
                      <span className="font-bold text-red-600">
                        {grandTotal.toLocaleString()} bahts
                      </span>
                    </div>
                    <div>
                      Status:{" "}
                      <span className="text-green-500 font-bold">
                        successful
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
                  <Link to="add">
                    <button className={`${button}`}>Add Course</button>
                  </Link>
                  <Link to="drop">
                    <button className={`${button}`}>Drop Course</button>
                  </Link>
                  <Link to="/payment" className="sm:col-span-2">
                    <button className={`${button}`}>Payment</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-2 gap-4">
              <div className="bg-[#c3554e] text-center text-white rounded-md py-2 mb-4">
                <h3 className="font-bold text-lg font-geologica">
                  Course Table
                </h3>
              </div>
              {isLoading ? (
                <div className="bg-gray-200 rounded-md overflow-x-auto animate-pulse">
                  <table className="min-w-full text-left border">
                    <thead>
                      <tr className="bg-[#c3554e] text-white">
                        <th className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </th>
                        <th className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </th>
                        <th className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </th>
                        <th className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="odd:bg-white even:bg-gray-100">
                        <td className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </td>
                        <td className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </td>
                        <td className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </td>
                        <td className="border px-4 py-2">
                          <div className="h-4 bg-gray-400 rounded w-4"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <CourseTable courses={Array.isArray(courses)?courses:[]} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseRegisPage;
