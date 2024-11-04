import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../assets/CampusLogo.png";

function MainNavbar() {
  return (
    <div className=" max-w-7xl min-w-[541px] mx-auto pb-3">
      <div className="bg-white rounded-t-lg">
        <div className="flex justify-between items-center">
          {/* Logo - visible only on medium and larger devices */}
          <div className="m-3 hidden md:block">
            <img
              src={Logo}
              alt="Campus Logo"
              style={{ width: "200px", height: "auto" }}
            />
          </div>

          {/* Menu */}
          <div className="p-4 flex items-center justify-center w-full md:w-auto">
            <div className="flex items-center">
              <Link
                to="/library"
                className="mr-3 rounded-full justify-center flex text-yellow-800 font-bold cursor-pointer hover:bg-zinc-200 p-2 pl-6 pr-6"
              >
                Home
              </Link>
              <Link
                to="/library/booklist"
                className="mr-3 rounded-full justify-center flex text-yellow-800 font-bold cursor-pointer hover:bg-zinc-200 p-2 pl-6 pr-6"
              >
                Booklist
              </Link>
              <Link
                to="/library/mybook"
                className="mr-3 rounded-full justify-center flex text-yellow-800 font-bold cursor-pointer hover:bg-zinc-200 p-2 pl-6 pr-6"
              >
                My Book
              </Link>
              <Link
                to="/library/contact"
                className="mr-3 rounded-full justify-center flex text-yellow-800 font-bold cursor-pointer hover:bg-zinc-200 p-2 pl-6 pr-6"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavbar;
