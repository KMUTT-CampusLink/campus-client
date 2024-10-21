import React, { useState } from "react";
import ClubCard from "../components/ClubCard";

// Mock club data
const clubData = [
  {
    name: "Football Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Basketball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Baseball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Hockey Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Tennis Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Volleyball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Football Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Basketball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Baseball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Hockey Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Tennis Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Volleyball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Football Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Basketball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Baseball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Hockey Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Tennis Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    name: "Volleyball Club",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
];

function ClubLandingPage() {
  // State to hold the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clubs based on the search term
  const filteredClubs = clubData.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <div className={containerDivStyles}> */}
      {/* <Navbar /> */}
      {/* </div> */}

      <div className="mx-auto w-full pt-10 pb-6 bg-white flex flex-col items-center justify-center">
        {/* Search Bar */}
        <div className="flex items-center justify-center w-[65%]">
          <div className="relative">
            <span className="absolute left-[0.8rem] -top-[0.5rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10A7 7 0 1 0 3 10a7 7 0 0 0 14 0z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10" // w-full for small screens
            value={searchTerm} // Bind input value to searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* Displaying filtered clubs */}
        <div className="bg-white mt-12 flex flex-wrap justify-center items-center p-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-8">
            {filteredClubs.map((club, index) => (
              <ClubCard
                key={index}
                clubName={club.name}
                imageSrc={club.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubLandingPage;
