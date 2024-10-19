import React from "react";

function NavbarSmall({ isOpen, closeMenu }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-red-500 to-orange-400 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <button
        onClick={closeMenu}
        className="text-white absolute top-4 right-4 focus:outline-none"
      >
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
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <ul className="flex flex-col space-y-4 p-6">
        <li className="text-white cursor-pointer hover:underline">Home</li>
        <li className="text-white cursor-pointer hover:underline">Payment</li>
        <li className="text-white cursor-pointer hover:underline">Learning</li>
        <li className="text-white cursor-pointer hover:underline">
          Campus Services
        </li>
        <li className="text-white cursor-pointer hover:underline">
          Help & Services
        </li>
        <li className="text-white cursor-pointer hover:underline">
          Registration
        </li>
        <li className="text-white cursor-pointer hover:underline">Grade</li>
      </ul>
    </div>
  );
}

export default NavbarSmall;
