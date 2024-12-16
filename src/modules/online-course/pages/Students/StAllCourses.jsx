import React from "react";

import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { useAllCoursesByStudentID } from "../../services/queries.js";

const StAllCourses = () => {
  const studentId = localStorage.getItem("studentId");
  const { data: allCourses } = useAllCoursesByStudentID(studentId);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  useEffect(() => {
    setFilteredCourses(allCourses || []);
  }, [allCourses]);

  const searchFunction = () => {
    const results = allCourses?.filter(
      (course) =>
        course.course_name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(results);
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <NavBar />

      <div className="w-full mb-3">
        <div className="flex mt-16 border-b-[1px] border-gray-300 text-lg gap-8 pt-5 
  max-sm:pl-4 max-md:pl-6 max-lg:pl-10 lg:pl-16 justify-center sm:justify-start">

          <span
            className="text-md sm:text-base lg:text-lg font-semibold text-gray-700 pb-1"
            onClick={() => navigate("/courses/st")}
          >
            Dashboard
          </span>

          <span
            className="text-md sm:text-base lg:text-lg font-semibold text-gray-700 border-b-4 border-[#EC5A51] hover:cursor-pointer pb-1 transition-all duration-300"
            onClick={() => navigate("/courses/st/all_courses")}
          >
            Courses
          </span>
        </div>



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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 sm:gap-8 lg:gap-10 justify-items-center mx-auto max-w-7xl 2xl:max-w-[90%]"
          >
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.sec_id} course={course} />
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

export default StAllCourses;
