import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import { useAllCoursesByProfessorID } from "../../services/queries.js";
import { useState, useEffect } from "react";

const TrDashboard = () => {
  const professorID = localStorage.getItem("empId");
  const { data: courses } = useAllCoursesByProfessorID(professorID);

  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    setFilteredCourses(courses || []);
  }, [courses]);

  const searchFunction = () => {
    const results = courses?.filter(
      (course) =>
        course.course_name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(results);
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <NavBar />
      <div className="w-full mt-12">
        <Searchbar
          search={search}
          setSearch={setSearch}
          searchFunction={searchFunction}
        />
        <div className="w-5/6 m-auto pt-1">
          <div className="flex justify-between items-center gap-2 pb-2 lg:pr-10">
            <span className="text-2xl sm:text-3xl font-bold pb-1 2xl:text-5xl">All Courses</span>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 sm:gap-8 lg:gap-10 justify-items-center mx-auto max-w-7xl 2xl:max-w-[90%] mb-2"
          >
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.sec_id} course={course} />
              ))
            ) : (
              <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500">
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
