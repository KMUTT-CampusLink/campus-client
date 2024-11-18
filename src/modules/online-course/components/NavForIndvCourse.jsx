import React from "react";
import ProfileButton from "../../registration/components/NavBarComponents/ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import SideForIndvCourse from "./SideForIndvCourse";

const NavForIndvCourse = ({page}) => {
  const [sideOpen, setSideOpen] = useState(false);
  const toggleSidebar = () => setSideOpen(!sideOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setSideOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex justify-between w-full items-center px-4 max-md:text-sm lg:text-lg bg-gradient-to-r from-[#EC5A51] to-[#F69800]
    py-3 max-md:pl-1 pl-5 pr-5"
    >
      <button className="flex justify-center rounded-md items-center gap-5 lg:gap-10 py-2 ml-2 lg:text-lg lg:ml-8 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          className=" hover:cursor-pointer hover:scale-110 "
          onClick={toggleSidebar}
          color="white"
        />
      </button>
      <div className="flex items-center pr-6 max-sm:pr-0 max-md:pr-4">
        <ProfileButton />
      </div>
      <SideForIndvCourse
        currentPage={page}
        closeSidebar={toggleSidebar}
        sideOpen={sideOpen}
      />
    </div>
  );
};

export default NavForIndvCourse;
