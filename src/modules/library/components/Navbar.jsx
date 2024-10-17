import React, { useState } from "react";
import NavbarSmall from "./NavbarSmall"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className=" min-w-[530px] p-6 flex  justify-between items-center bg-gradient-to-r from-red-500 to-orange-400">
      {/* Hamburger Menu */}
      <div className="block md:hidden">
        <button onClick={openMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Large Screen Menu */}
      <ul className="hidden md:flex md:space-x-4">
        <li className="text-white cursor-pointer hover:text-amber-400">Home</li>
        <li className="text-white cursor-pointer hover:text-amber-400">Payment</li>
        <li className="text-white cursor-pointer hover:text-amber-400">Learning</li>
        <li className="text-white cursor-pointer hover:text-amber-400">
          Campus Services
        </li>
        <li className="text-white cursor-pointer hover:text-amber-400">
          Help & Services
        </li>
        <li className="text-white cursor-pointer hover:text-amber-400">
          Registration
        </li>
        <li className="text-white cursor-pointer hover:text-amber-400">Grade</li>
      </ul>

      {/* Profile */}
      <div className="ml-auto">
        <h1 className="text-white cursor-pointer hover:text-amber-400">Profile</h1>
      </div>

      {/* Small Screen Sidebar */}
      <NavbarSmall isOpen={isMenuOpen} closeMenu={closeMenu} />
    </div>
  );
}

export default Navbar;
