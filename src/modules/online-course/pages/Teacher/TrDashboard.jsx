import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar.jsx"
import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import courses from "./dummyCourse.js";
import { useState } from "react";

const TrDashboard = () => {

  return (
    <div className="min-h-screen">
        <NavBar />

      <div className="w-full 2xl:pt-5">
        <Searchbar/>
        <div className="w-3/4 m-auto">
          <span className="text-4xl font-bold pb-3 2xl:text-6xl">All Courses</span>
          <div
            className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto 2xl:max-w-[90%] max-w-7xl"
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                imageURL={course.imageUrl}
                title={course.title}
                description={course.description}
                route={"course_description"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrDashboard;
