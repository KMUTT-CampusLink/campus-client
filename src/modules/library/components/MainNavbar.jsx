import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/CampusLogo.png";
import { DownOutlined } from "@ant-design/icons";

function MainNavbar() {
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? "text-black underline underline-offset-[33px] decoration-2 decoration-orange-500" : "text-neutral-500";

  return (
    <div className="navbar bg-white rounded-t-lg w-[100%] drop-shadow-xl mx-auto min-w-[541px] z-50 sticky top-0 ">
      <div className="navbar-start">
        {/* Logo - links to homepage */}
        <Link to="/library" className="m-3">
          <img
            src={Logo}
            alt="Campus Logo"
            style={{ width: "10rem", height: "auto" }}
          />
        </Link>
      </div>

      <div className="navbar-center">
        {/* Menu Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/library/booklist"
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive("/library/booklist")}`}
          >
            Books
          </Link>

          {/* Dropdown for News */}
          <div className="dropdown">
            <ul
              tabIndex={0}
              className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold items-center ${isActive("/library/announcement") || isActive("/library/event")}`}
            >
              News 
            </ul>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link to="/library/announcement" className={isActive("/library/announcement")}>
                  Announcement
                </Link>
              </li>
              <li>
                <Link to="/library/event" className={isActive("/library/event")}>
                  Event
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/library/mybook"
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive("/library/mybook")}`}
          >
            MyBook
          </Link>

          <Link
            to="/library/contact"
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive("/library/contact")}`}
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        {/* Search Bar */}
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="ค้นหา"
              className="input input-bordered"
            />
            <button className="btn btn-square">🔍</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavbar;
