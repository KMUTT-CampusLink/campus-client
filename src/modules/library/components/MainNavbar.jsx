import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/CampusLogo.png";

function MainNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to check if the link is active
  const isActive = (path) =>
    location.pathname === path
      ? "text-black underline underline-offset-[33px] decoration-2 decoration-orange-500"
      : "text-neutral-500";

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/library/search/${searchTerm}`);
    }
  };

  return (
    <div className="navbar bg-white rounded-t-lg w-[100%] drop-shadow-xl mx-auto min-w-[541px] z-50 sticky top-0">
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
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive(
              "/library/booklist"
            )}`}
          >
            Books
          </Link>

          {/* Dropdown for News */}
          <div className="dropdown">
            <ul
              tabIndex={0}
              className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold items-center ${
                isActive("/library/announcement") || isActive("/library/event")
              }`}
            >
              News
            </ul>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link to="/library/announcement">Announcement</Link>
              </li>
              <li>
                <Link to="/library/event">Event</Link>
              </li>
            </ul>
          </div>

          <Link
            to="/library/mybook"
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive(
              "/library/mybook"
            )}`}
          >
            MyBook
          </Link>

          <Link
            to="/library/contact"
            className={`btn btn-ghost hover:text-black hover:bg-white hover:underline underline-offset-[33px] decoration-2 decoration-orange-500 normal-case text-lg font-semibold ${isActive(
              "/library/contact"
            )}`}
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
              placeholder="Search Book"
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Trigger search on Enter key press
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="btn duration-200 rounded-xl mx-3 bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:border-orange-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavbar;
