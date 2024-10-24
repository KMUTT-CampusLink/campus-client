import React, { useState, useEffect } from "react";
import RightArrow from "../../assets/ArrowRight.png";
import LeftArrow from "../../assets/ArrowLeft.png";
import { Link } from "react-router-dom";
function AnnouncementCard({ announcements = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedAnnouncements, setSortedAnnouncements] = useState([]);

  useEffect(() => {
    // Sort announcements by updated_at date in descending order (newest first)
    const sorted = [...announcements].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
    setSortedAnnouncements(sorted);
  }, [announcements]);

  if (!sortedAnnouncements || sortedAnnouncements.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold">No Announcements Available</h1>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sortedAnnouncements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sortedAnnouncements.length - 1 : prevIndex - 1
    );
  };

  const currentAnnouncement = sortedAnnouncements[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[20rem] justify-between shadow-2xl rounded-2xl relative overflow-hidden bg-white w-full">
      <div className="p-6 flex flex-col justify-center w-full lg:w-2/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-semibold">Announcement</h1>
          <Link to="/library/announcement">
            <button className="flex items-center p-2 px-6 bg-orange-100 rounded-full font-semibold text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300">
              View All
            </button>
          </Link>
        </div>

        {/* Announcement Content */}
        <div className="flex flex-col h-full p-2">
          <h2 className="text-2xl font-semibold mb-2 text-sky-950 flex items-center">
            {currentAnnouncement?.title}{" "}
            {sortedAnnouncements.indexOf(currentAnnouncement) < 5 && (
              <span className="text-orange-500 animate-bounce ml-3">NEW!</span>
            )}
          </h2>
          <h3 className="text-sky-800 text-xl">
            {new Date(currentAnnouncement?.updated_at).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </h3>
          <h3 className="text-gray-950 text-xl font-thin">
            {currentAnnouncement?.description}
          </h3>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/3 h-[12rem] lg:h-auto">
        <img
          src={currentAnnouncement?.image}
          alt="Announcement"
          className="h-full w-full object-cover rounded-b-2xl lg:rounded-none lg:rounded-r-2xl"
        />
      </div>

      {/* Arrows - positioned at bottom left */}
      <div className="absolute bottom-4 left-4 flex space-x-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="bg-white text-white p-3 rounded-full transition-transform ease-in-out hover:scale-110 hover:bg-gray-100 duration-300 shadow-xl"
        >
          <img src={LeftArrow} alt="Previous" className="w-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="bg-white text-white p-3 rounded-full transition-transform ease-in-out hover:scale-110 hover:bg-gray-100 duration-300 shadow-xl"
        >
          <img src={RightArrow} alt="Next" className="w-5" />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementCard;
