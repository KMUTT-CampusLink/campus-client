import React from "react";

import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFile, faStar } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { useAllCoursesByStudentID } from "../../services/queries.js";

const StAllCourses = () => {
  const studentId = localStorage.getItem("studentId");
  const { data: courses, isLoading } = useAllCoursesByStudentID(studentId);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    setFilteredCourses(courses || []);
  }, [courses]);

  const searchFunction = () => {
    const results = courses?.filter((course) =>
      course.course_name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(results);
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <NavBar />

      <div className="w-full mb-3">
        <div
          className="flex mt-16 border-b-[1px] border-black text-lg gap-10 pt-5 
        max-sm:pl-16 max-md:pl-20 max-lg:pl-36 lg:pl-56"
        >
          <span
            className="hover:border-b-4 hover:border-black hover:cursor-pointer"
            onClick={() => navigate("/courses/st")}
          >
            Dashboard
          </span>
          <span
            className="hover:border-b-4 hover:border-black hover:cursor-pointer"
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
        <div className="w-3/4 m-auto">
          <div className="flex justify-between items-center gap-2 pb-3 lg:pr-10">
            <span className="text-4xl font-bold">All Courses</span>
          </div>
          <div
            className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto max-w-7xl"
          >
            {filteredCourses &&  filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.code}
                  imageURL={course.imageUrl}
                  code={course.code}
                  title={course.course_name}
                  semester={course.semester}
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

export default StAllCourses;
