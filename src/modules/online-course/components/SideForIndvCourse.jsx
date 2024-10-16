import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideForIndvCourse = ({ closeSidebar, sideOpen, currentPage }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };
    if (sideOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sideOpen, closeSidebar]);

  // Function to navigate back to the dashboard dynamically
  const backToDashboard = () => {
    if (location.pathname.includes("/courses/St")) {
      navigate("/courses/St");
    } else {
      navigate("/courses/Tr");
    }
  };

  // Helper function to handle navigation based on role (St/Tr)
  const handleNavigation = (subPath) => {
    if (location.pathname.includes("/courses/St")) {
      navigate(`/courses/St/${subPath}`);
    } else {
      navigate(`/courses/Tr/${subPath}`);
    }
  };

  return (
    <div
      className={`text-lg fixed top-0 left-0 w-64 h-full bg-[#ecb45e] text-black transform transition-transform duration-350 ${
        sideOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div ref={sidebarRef} className="flex flex-col h-full justify-between">
        <div className="p-4">
          <button onClick={closeSidebar} className="flex justify-start pt-3">
            <FontAwesomeIcon
              icon={faXmark}
              size="xl"
              style={{ color: "white" }}
              className="hover:scale-125"
            />
          </button>
          <ul className="mr-5 mt-24 flex-grow">
            {/* Description Link */}
            <li
              onClick={() => handleNavigation("course_description")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "description"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Description
            </li>
            {/* Materials Link */}
            <li
              onClick={() => handleNavigation("course_material")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "materials"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Materials
            </li>
            {/* Tasks Link */}
            <li
              onClick={() => handleNavigation("tasks")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "tasks"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Tasks
            </li>
            {/* Discussion Link */}
            <li
              onClick={() => handleNavigation("discussion")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "discussion"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Discussion
            </li>
            {/* Online Exam Link */}
            <li
              // onClick={() => handleNavigation("online_exam")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "online_exam"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Online Exam
            </li>

            {/* Attendance Link */}
            <li
              // onClick={() => handleNavigation("attendance")}
              className={`mb-4 p-2 border-b-2 ${
                currentPage !== "attendance"
                  ? "text-white hover:scale-110 hover:cursor-pointer transition-transform duration-2000"
                  : "text-black"
              }`}
            >
              Attendance
            </li>
          </ul>
        </div>
        <div className="w-full p-5 border-t-2">
          <button
            className="flex items-center gap-4 hover:scale-110 "
            onClick={backToDashboard}
          >
            <span className="mr-2">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                style={{ color: "white" }}
                size="xl"
              />
            </span>
            <span className="text-white text-lg ">Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideForIndvCourse;
