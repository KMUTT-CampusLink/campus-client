import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profile-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import CommentPopup from "../../components/CommentPopup";
import { useCourseHeaderBySectionID } from "../../services/queries";
import CourseHeader from "../../components/CourseHeader";

const TrDiscussion = () => {
  
  const sec_id = localStorage.getItem("sec_id");

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  console.log(details);

  const [discussions] = useState([
    {
      no: 1,
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch2 1st Complement",
      timestamp: "30 minutes ago",
      description:
        "How does the 1's complement representation of negative numbers work in binary, and what are its advantages...",
    },
    {
      no: 2,
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch2 2nd Complement",
      timestamp: "30 minutes ago",
      description: "What's the difference between 1 and 2 complement?",
    },
    {
      no: 3,
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch3 NRZ",
      timestamp: "30 minutes ago",
      description: "I don't know how to draw NRZ Signal",
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <NavForIndvCourse page={"discussion"} />

      {/* <div className="border-b">
        <div className="py-12 px-4 border-gray-300 w-full lg:w-3/4 mx-auto">
          <h2 className="text-2xl font-bold text-[#ecb45e] mb-4">
            About Classroom
          </h2>
          <div className="text-gray-800 space-y-1">
            <p>
              <span className="font-semibold">Course:</span> CSC-230 Computer
              Architecture & Design
            </p>
            <p>
              <span className="font-semibold">Lecturer:</span> Arjan
            </p>
            <p>
              <span className="font-semibold">Time:</span> 1:30 to 4:30 PM
              (Thursday)
            </p>
          </div>
        </div>
      </div> */}
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      {!isPopupOpen && (
        <div className="py-8 w-full px-4">
          <div className="flex justify-between items-center lg:w-3/4 mx-auto mb-6 relative">
            <h2 className="text-2xl font-bold text-[#ecb45e]">Upload bar</h2>
            <div className="relative">
              <button
                className="border bg-white rounded-full shadow-sm px-4 py-2 flex items-center hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              >
                <span className="text-gray-700 font-medium">Sort by time</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#D4A015"
                  className="ml-2"
                />
              </button>
              {dropDownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-20">
                  <p
                    className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                    onClick={() => {
                      setDropDownOpen(false);
                      // Add sorting functionality here if needed
                    }}
                  >
                    Sort by time
                  </p>
                  <p
                    className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                    onClick={() => {
                      setDropDownOpen(false);
                      // Add sorting functionality here if needed
                    }}
                  >
                    Sort by title
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center max-w-xs mx-auto mb-6">
            <div className="border border-gray-300 rounded-md w-full h-48 flex flex-col items-center justify-center p-4">
              <img src={gallery} alt="Upload Icon" className="w-12 h-12 mb-2" />
              <div className="text-center">
                <h2 className="text-lg font-bold"># Title</h2>
                <p className="text-gray-500">Upload here!</p>
              </div>
              <button className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white py-2 mt-4 rounded-md flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> Upload
              </button>
            </div>
          </div>

          <div className="lg:w-3/4 mx-auto">
            <h2 className="text-2xl font-bold text-[#ecb45e] mb-4 text-center lg:text-left">
              Discussion Area
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {discussions.map((discussion) => (
                <div
                  key={discussion.no}
                  className="border border-gray-300 rounded-lg p-4 flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={profile} alt="Profile" className="w-10 h-10" />
                      <div>
                        <h3 className="text-sm font-semibold">
                          {discussion.person}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {discussion.timestamp}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-md font-semibold">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {discussion.description}
                    </p>
                  </div>
                  <button
                    className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white py-2 rounded-md"
                    onClick={openPopup}
                  >
                    Comment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && <CommentPopup closePopup={closePopup} />}
    </div>
  );
};

export default TrDiscussion;
