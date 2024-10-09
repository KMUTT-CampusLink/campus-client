import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";
import CourseTable from "../components/CourseTable";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";

function CourseRegisPage() {
  const courses = [
    { name: "Math 101", credit: 3, condition: "None" },
    { name: "English 102", credit: 2, condition: "None" },
    { name: "Computer Science 201", credit: 4, condition: "None" },
  ];

  const totalCredits = courses.reduce((acc, course) => acc + course.credit, 0);
  const totalCourses = courses.length;
  const grandTotal = 52500; // You can calculate this based on the number of courses or other logic

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
                    <span className="text-green-500 font-bold">successful</span>
                  </div>
                </div>
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
              <CourseTable data={courses} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseRegisPage;
