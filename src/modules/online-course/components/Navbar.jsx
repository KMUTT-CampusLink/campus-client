import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const toggleSidebar = () => setSideOpen(!sideOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setSideOpen(false);
    };
     window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  
  return (
    <div
      className="flex justify-between w-full items-center px-4 max-md:text-sm lg:text-lg bg-gradient-to-r from-[#EC5A51] to-[#F69800]
    pb-8 pt-5 pl-5 pr-5"
    >
      <div className="hidden max-sm:block  max-sm:hover:cursor-pointer">
        <FontAwesomeIcon icon={faBars} size="xl" onClick={toggleSidebar} />
      </div>
      <div className="max-sm:hidden flex gap-5 lg:gap-10 py-4 ml-2 lg:text-lg lg:ml-8 px-4">
        <FontAwesomeIcon
          icon={faHouse}
          size="xl"
          className="mr-2 hover:cursor-pointer hover:scale-110"
        />
        <span className="hover:cursor-pointer hover:scale-110 ">Payment</span>
        <span className="hover:cursor-pointer hover:scale-110 ">Learning</span>
        <span className="hover:cursor-pointer hover:scale-110 ">
          Campus Services
        </span>
        <span className="hover:cursor-pointer hover:scale-110 ">
          Help & Tools
        </span>
        <span className="hover:cursor-pointer hover:scale-110 ">
          Registration
        </span>
        <span className="hover:cursor-pointer hover:scale-110">Grade</span>
      </div>
      <div className="flex items-center pr-6 max-md:pr-4">
        <FontAwesomeIcon
          icon={faUser}
          size="xl"
          className="hover:cursor-pointer hover:scale-110"
        />
      </div>
      <Sidebar closeSidebar={toggleSidebar} sideOpen={sideOpen} />
    </div>
  );
}

export default Navbar