import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import React from "react";

const Sidebar = ({ closeSidebar, sideOpen }) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        }
            if (sideOpen) {
              document.addEventListener("mousedown", handleClickOutside);
            } else {
              document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => document.removeEventListener("mousedown", handleClickOutside)
        
    }, [sideOpen, closeSidebar]);

    return (
      <div
        className={`text-lg fixed top-0 left-0 w-64 h-full bg-[#cc6c3f] text-black p-4 transform transition-transform duration-300 ${
          sideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div ref={sidebarRef} className="">
          <button
            onClick={closeSidebar}
            className="w-full flex justify-end hover:animate-bounce"
          >
            <FontAwesomeIcon icon={faXmark} size="xl" className="" />
          </button>
          <ul className="mr-5">
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Payment
            </li>
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Learning
            </li>
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Campus Services
            </li>
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Help & Tools
            </li>
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Registration
            </li>
            <li className="mb-4 hover:scale-110 hover:-rotate-2 hover:cursor-pointer transition-transform duration-2000 p-2 rounded-lg">
              Grade
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Sidebar;
