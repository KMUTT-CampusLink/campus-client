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
      className={`z-10 max-sm:w-40 text-lg fixed top-0 left-0 w-64 h-full bg-[#ecb45e] text-black transform transition-transform duration-350 ${
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
          <ul className="max-sm:text-sm mr-5 mt-24 flex-grow">
            {/* Description Link */}
            <li
              onClick={() => handleNavigation("course_description")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "course_description"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Description
              </span>
            </li>
            {/* Materials Link */}
            <li
              onClick={() => handleNavigation("course_material")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "course_material"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Materials
              </span>
            </li>
            {/* Tasks Link */}
            <li
              onClick={() => handleNavigation("tasks")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "tasks"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Tasks
              </span>
            </li>
            {/* Discussion Link */}
            <li
              onClick={() => handleNavigation("discussion")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "discussion"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Discussion
              </span>
            </li>
            {/* Online Exam Link */}
            <li
              // onClick={() => handleNavigation("online_exam")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "online_exam"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Online Exam
              </span>
            </li>

            {/* Attendance Link */}
            <li
              // onClick={() => handleNavigation("attendance")}
              className="mb-4 p-2 border-b-2"
            >
              <span
                className={`${
                  currentPage !== "attendance"
                    ? "hover:text-[#6E6E6E] text-white hover:cursor-pointer"
                    : "text-black"
                }`}
              >
                Attendance
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full p-5 border-t-2">
          <button className="flex items-center gap-4" onClick={backToDashboard}>
            <span className="mr-2">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                style={{ color: "white" }}
                size="xl"
              />
            </span>
            <span className="max-sm:text-sm text-white text-lg ">
              Dashboard
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideForIndvCourse;
