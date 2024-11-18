import React from "react";

import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
// import courses from "./dummyCourse.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFile, faStar } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAllCourses, useCoursesByStudentID } from "../../services/queries.js";

const StDashboard = () => {
  
  const studentId = localStorage.getItem("studentId");
  const semesterId = 1010;
  const navigate = useNavigate();
  const { data: courses, isLoading } = useCoursesByStudentID(studentId);
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
        <Searchbar />
        <div className="w-3/4 m-auto">
          <div className="flex justify-between items-center gap-2 pb-3 lg:pr-10">
            <span className="text-4xl font-bold ">Recent Courses</span>
            <button
              className="text-[#EC5A51] text-md font-bold lg:text-base hover:underline"
              onClick={() => navigate("/courses/st/all_courses")}
            >
              See All
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto w-3/4"
        >
          {courses?.map((course) => (
            <CourseCard
              key={course.code}
              code={course.code}
              imageURL={course.imageUrl}
              title={course.course_name}
              semester={course.description}
              route={"course_description"}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="font-bold max-md:text-sm max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52">
          Important Announcement
          <FontAwesomeIcon icon={faBell} className="ml-2" size="lg" />
        </span>
      </div>
      <div className="border border-gray-400 rounded-md mb-5 mt-4 max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52 pb-3 overflow-y-auto">
        <div className=" flex justify-between max-sm:mx-10 max-md:mx-20 max-lg:mx-28 lg:mx-48">
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            TITLE
          </span>
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            COURSE
          </span>
        </div>
        <div className="font-semibold flex justify-between max-md:gap-2 max-md:mx-5 max-lg:mx-14 lg:mx-20 border-b-2 border-black ">
          <span className="max-sm:text-sm w-1/2 text-lg">
            We have an evening lab today. Don't forget to arrive on time.
          </span>
          <span className="max-sm:text-sm lg:pr-20 text-lg">
            Csc 213 Database
          </span>
        </div>
      </div>

      <span className="max-md:text-sm font-bold max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52">
        Upcoming events
        <FontAwesomeIcon icon={faFile} className="ml-2" size="lg" />
      </span>
      <div className=" border border-gray-400 rounded-md mb-5 mt-4 max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52 pb-3 overflow-y-auto">
        <div className="flex justify-between max-sm:mx-10 max-md:mx-20 max-lg:mx-28 lg:mx-48">
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            TIME
          </span>
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            COURSE
          </span>
        </div>
        <div className="flex justify-between max-md:gap-2 max-md:mx-5 max-lg:mx-14 lg:mx-20 border-b-2 border-black ">
          <span className="max-sm:text-sm font-semibold w-1/2 text-lg">
            8:00AM-2PM
          </span>
          <span className="max-sm:text-sm font-semibold lg:pr-20 text-lg">
            Csc 213 Database
          </span>
        </div>
      </div>

      <span className="max-md:text-sm font-bold max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52">
        Today Class Schedule
        <FontAwesomeIcon icon={faStar} className="ml-2" size="lg" />
      </span>
      <div className="border border-gray-400 rounded-md mb-5 mt-4 max-md:mx-20 md:mx-32 lg:mx-44 xl:mx-52 pb-3 overflow-y-auto">
        <div className="flex justify-between max-sm:mx-10 max-md:mx-20 max-lg:mx-28 lg:mx-48">
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            TIME
          </span>
          <span className="font-bold text-[#EC5A51] text-xl border-b-[1px] border-b-[#EC5A51]">
            COURSE
          </span>
        </div>
        <div className="flex justify-between max-md:gap-2 max-md:mx-5 max-lg:mx-14 lg:mx-20 border-b-2 border-black ">
          <span className="max-sm:text-sm font-semibold w-1/2 text-lg">
            8:00AM-2PM
          </span>
          <span className="max-sm:text-sm font-semibold lg:pr-20 text-lg">
            Csc 213 Database
          </span>
        </div>
      </div>
    </div>
  );
};

export default StDashboard;
