import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
// import courses from "./dummyCourse.js";
import { useState, useEffect } from "react";
import { useAllCoursesByProfessorID } from "../../services/queries.js";
import { useNavigate } from "react-router-dom";

const TrDashboard = () => {
  const navigate = useNavigate();

  const professorID = localStorage.getItem("empId");
  const {
    data: courses,
    isLoading,
    isError,
  } = useAllCoursesByProfessorID(professorID);

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
    <div className="min-h-screen">
      <NavBar />

      <div className="w-full 2xl:pt-5">
        <Searchbar
          search={search}
          setSearch={setSearch}
          searchFunction={searchFunction}
        />
        <div className="w-3/4 m-auto">
          <span className="text-4xl font-bold pb-3 2xl:text-6xl">
            All Courses
          </span>
          <div
            className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto 2xl:max-w-[90%] max-w-7xl"
          >
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.code}
                  imageURL={course.imageUrl}
                  code={course.code}
                  title={course.course_name}
                  semester={course.semester}
                  section={course.sec_name}
                  route={"course_description"}
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
