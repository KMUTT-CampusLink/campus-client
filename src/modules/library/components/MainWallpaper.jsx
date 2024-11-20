import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./MainWallpaper.css"; // Import custom CSS for wave animation
import { Link } from "react-router-dom";

function MainWallpaper() {
  const [data, setData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/library/book");
      setData(response.data);
      setFilteredBooks(response.data); // Set filtered books to full book list initially
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between bg-white p-8 lg:p-16  ">
      <div className="container mx-auto flex p-6">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-4 ">
          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            Welcome to <span className="text-orange-600">Campus Library</span>
            <br />A Gateway to Books, Learning, and Resources.
          </h1>

          {/* Subheading */}
          <p className="text-gray-700 text-lg">
            Access various types of books, research materials, and digital
            resources to expand your knowledge and skills.
          </p>

          {/* Buttons */}
          <div className="space-x-4">
            <Link to={`/library/booklist`}>
              <button className="btn bg-orange-500 border-none text-white hover:bg-orange-600">
                Browse book now!
              </button>
            </Link>

            <button className="btn text-gray-700 border-none hover:bg-neutral-100 bg-white">
              Continue Exploring <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        {/* Right Section - Stacked Book Covers */}
        <div className="relative lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0 scale-105 z-20">
          {filteredBooks.slice(30, 40).map((book, index) => (
            <img
              key={index}
              src={book.cover_image}
              alt={book.title}
              className={`absolute w-24 lg:w-40 transform shadow-xl rounded-lg transition duration-300 ease-in-out ${
                index === 0 ? "z-30 scale-110" : ""
              } ${index === 1 ? "translate-x-[6rem] scale-90 z-20" : ""} ${
                index === 2 ? "translate-x-[10rem] scale-75 z-10" : ""
              } ${index === 3 ? "-translate-x-[6rem] scale-90 z-20" : ""} ${
                index === 4 ? "-translate-x-[10rem] scale-75 z-10" : ""
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1731049272">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default MainWallpaper;
