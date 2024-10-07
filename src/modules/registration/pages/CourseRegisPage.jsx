import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";
import CourseTable from "../components/CourseTable";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";

function CourseRegisPage() {
  const courses = [
    { name: "Math 101", credit: 3, condition: "None" },
    { name: "English 102", credit: 2, condition: "None" },
    { name: "Computer Science 201", credit: 4, condition: "None" },
  ];

  return (
    <>
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
                      Total Credits: <span className="font-bold">17</span>
                    </div>
                    <div>
                      Total Courses: <span className="font-bold">8</span>
                    </div>
                    <div>
                      Grand Total:{" "}
                      <span className="font-bold text-red-600">52,500</span>{" "}
                      bahts
                    </div>
                    <div>
                      Status:{" "}
                      <span className="text-green-500 font-bold">
                        successful
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between">
                      <Link to="add" className="w-1/2 mr-2">
                        <button className="w-full bg-[#A45C40] hover:bg-[#8A4832] text-white py-3 rounded-lg font-semibold transition duration-300">
                          Add Course
                        </button>
                      </Link>
                      <Link to="drop" className="w-1/2 ml-2">
                        <button className="w-full bg-[#A45C40] hover:bg-[#8A4832] text-white py-3 rounded-lg font-semibold transition duration-300">
                          Drop Course
                        </button>
                      </Link>
                    </div>
                    <Link to="/payment">
                      <button className="w-full mt-6 bg-[#A45C40] hover:bg-[#8A4832] text-white py-3 rounded-lg font-semibold transition duration-300">
                        Pay
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-span-2 gap-4">
                <h3 className="font-bold text-lg mb-4">Course Table</h3>
                <CourseTable data={courses} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CourseRegisPage;
