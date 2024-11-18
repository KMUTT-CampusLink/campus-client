import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import { useAllCoursesByProfessorID } from "../../services/queries.js";

const TrDashboard = () => {
  const professorID = localStorage.getItem("empId");
  const { data: courses } = useAllCoursesByProfessorID(professorID);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="w-full 2xl:pt-5">
        <Searchbar />
        <div className="w-3/4 m-auto">
          <span className="text-4xl font-bold pb-3 2xl:text-6xl">
            All Courses
          </span>
          <div
            className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto 2xl:max-w-[90%] max-w-7xl"
          >
            {courses?.length > 0 ? (
              courses?.map((course) => (
                <CourseCard
                  key={course.sec_id}
                  course={course}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                No courses found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrDashboard;
