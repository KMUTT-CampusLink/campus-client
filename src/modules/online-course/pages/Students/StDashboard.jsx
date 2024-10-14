import React from "react";
import Navbar from '../../components/Navbar.jsx'
import Searchbar from "../../components/Searchbar";
import CourseCard from "../../components/CourseCard";
import courses from "./dummyCourse.js";
import { useState } from "react";

const StDashboard = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-white">
      <Navbar />

      <div className="z-20 -mt-6 bg-white rounded-t-badge">
        <div className="pt-8 pb-3 pl-32">Dashboard</div>
        <Searchbar />
        <div className="w-3/4 m-auto">
          <span className="text-4xl font-bold pb-3 ">All Courses</span>
          <div
            className="grid max-md:grid-cols-2 grid-cols-3 p-5 gap-10 max-md:p-5 max-md:gap-6 max-sm:p-2
            justify-items-center mx-auto max-w-7xl"
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                imageURL={course.imageUrl}
                title={course.title}
                description={course.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div>Upcoming Events</div>
    </div>
  );
};

export default StDashboard;
