import React from "react";

import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
// import courses from "./dummyCourse.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFile, faStar } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useAllCourses,
  useAllCoursesByStudentID,
  useCoursesByStudentID,
} from "../../services/queries.js";

const StDashboard = () => {
  const studentId = localStorage.getItem("studentId");
  const semesterId = 1010;
  const navigate = useNavigate();
  const { data: courses } = useCoursesByStudentID(studentId);
  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <NavBar />

      <div className="w-full mb-3">
        <div className="flex mt-16 border-b-[1px] border-gray-300 text-lg gap-8 pt-5 
  max-sm:pl-4 max-md:pl-6 max-lg:pl-10 lg:pl-16 justify-center sm:justify-start">

          <span
            className="text-md sm:text-base lg:text-lg font-semibold text-gray-700 border-b-4 border-[#EC5A51] pb-1 cursor-pointer"
            onClick={() => navigate("/courses/st")}
          >
            Dashboard
          </span>

          <span
            className="text-md sm:text-base lg:text-lg font-semibold text-gray-700 cursor-pointer pb-1 transition-all duration-300"
            onClick={() => navigate("/courses/st/all_courses")}
          >
            Courses
          </span>


        </div>


        <div className="w-5/6 m-auto pt-4">
          <div className="flex justify-between items-center gap-2 lg:pr-10 mb-2">

            <span className="text-2xl sm:text-3xl font-bold pb-1 2xl:text-5xl ">
              Recent Courses
            </span>


            <button
              className="text-[#EC5A51] font-semibold text-sm sm:text-md lg:text-base hover:underline px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-lg transition-transform duration-300 hover:scale-105"
              onClick={() => navigate("/courses/st/all_courses")}
            >
              See All
            </button>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 sm:gap-8 lg:gap-10 justify-items-center mx-auto max-w-7xl 2xl:max-w-[90%]"
          >
            {courses?.map((course) => (
              <CourseCard key={course.sec_id} course={course} />
            ))}
          </div>


          <div className="pt-4">
            <span className="font-semibold max-md:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
              Important Announcement
              <FontAwesomeIcon icon={faBell} className="ml-2" size="lg" />
            </span>
          </div>


          <div className="border border-gray-300 rounded-lg mb-6 mt-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex flex-col justify-between items-start max-md:gap-4 max-md:mx-4 max-lg:mx-8 lg:mx-12 p-2 bg-gray-50 rounded-md">
              <span className="font-semibold text-[#EC5A51] text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                CSC 213 Database
              </span>
              <span className="font-normal text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
                We have an evening lab today. Don't forget to arrive on time.
              </span>
            </div>
          </div>

          <div className="pt-4">
            <span className="font-semibold max-md:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
              Upcoming events
              <FontAwesomeIcon icon={faBell} className="ml-2" size="lg" />
            </span>
          </div>


          <div className="border border-gray-300 rounded-lg mb-6 mt-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex flex-col justify-between items-start max-md:gap-4 max-md:mx-4 max-lg:mx-8 lg:mx-12 p-2 bg-gray-50 rounded-md">
              <span className="font-semibold text-[#EC5A51] text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                CSC 213 Database
              </span>
              <span className="font-normal text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
                8:00AM-2:00PM
              </span>
            </div>
          </div>

          <div className="pt-4">
            <span className="font-semibold max-md:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
              Today Class Schedule
              <FontAwesomeIcon icon={faStar} className="ml-2" size="lg" />
            </span>
          </div>


          <div className="border border-gray-300 rounded-lg mb-6 mt-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex flex-col justify-between items-start max-md:gap-4 max-md:mx-4 max-lg:mx-8 lg:mx-12 p-2 bg-gray-50 rounded-md">
              <span className="font-semibold text-[#EC5A51] text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                CSC 213 Database
              </span>
              <span className="font-normal text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
                8:00AM-2:00PM
              </span>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default StDashboard;
