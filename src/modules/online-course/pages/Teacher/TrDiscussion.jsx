import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profile-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/Upload_Popup";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup";
import CommentPopup from "../../components/CommentPopup";

const TrDiscussion = () => {
  const [discussions, setDiscussions] = useState([
    {
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch2 1st Complement",
      timestamp: "30 minutes ago",
      description:
        " How does the 1's complement represe- ntation of negative numbers work in binary, and what are its advantages.......",
    },
    {
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch2 1st Complement",
      timestamp: "30 minutes ago",
      description:
        " How does the 1's complement represe- ntation of negative numbers work in binary, and what are its advantages.......",
    },
    {
      person: "AKARI KYAW THEIN(66130500801)",
      title: "#Ch2 1st Complement",
      timestamp: "30 minutes ago",
      description:
        " How does the 1's complement represe- ntation of negative numbers work in binary, and what are its advantages.......",
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <NavForIndvCourse page={"tasks"} />

      <div className="max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
            About Classroom
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Course:</span> CSC-230 Computer
            Architecture & Design
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Lecturer:</span> Arjan
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Time:</span> 1:30 to 4:30 PM
            (Thursday)
          </div>
        </div>
      </div>
      {!isPopupOpen && (
        <div className="py-8 w-full">
          <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center mb-4">
            <div className="text-2xl font-bold text-[#ecb45e]">Upload bar</div>
            <div className="flex relative">
              <button
                className="relative bg-[#FFFFFF] rounded-lg shadow-lg px-4 py-2"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              >
                <span>Sort by time</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#D4A015"
                  className="ml-2"
                />
              </button>
              {dropDownOpen && (
                <div className="flex flex-col border-[1px] border-[#BEBEBE] shadow-lg bg-[#FFFFF] absolute top-10 w-full">
                  <p className="border-b-[1px] border-[#BEBEBE] flex items-center justify-center py-2">
                    Sort by time
                  </p>
                  <p className="border-b-[1px] border-[#BEBEBE] flex items-center justify-center py-2">
                    Sort by time
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-screen">
            <div className="border border-black rounded-md w-[379px] h-[249px] max-w-full max-h-full sm:w-[261px] sm:h-[171px] md:w-[379px] md:h-[249px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col justify-center items-center">
                  <img src={gallery} alt="Image" width={67} height={67} />
                  <div className="border border-black rounded-lg p-4 w-[356px] h-[99px] max-w-full max-h-full sm:w-[241px] sm:h-[67px] md:w-[356px] md:h-[99px] mt-2">
                    <h2 className="text-lg font-bold"># Title</h2>
                    <h2
                      className="text-lg font-bold"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                    >
                      Upload here!
                    </h2>
                  </div>
                </div>

                <button className="mt-2 w-full h-8 bg-[#ecb45e] hover:bg-[#d9a24b] rounded-b-lg text-white transition duration-200">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="xl" />
                  Upload
                </button>
              </div>
            </div>
          </div>

          <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center mb-6 mt-8">
            <div className="text-2xl font-bold text-[#ecb45e]">
              Discussion Area
            </div>
          </div>

          <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center mb-6 mt-8 flex-wrap">
            {discussions.map((discussion, index) => {
              return (
                <div
                  key={index}
                  className="border border-black rounded-md mb-8 w-[100%] sm:w-[30%]"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col justify-left items-left m-2">
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={profile}
                            alt="Image"
                            width={38}
                            height={38}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2>{discussion.person}</h2>
                          <span className="text-[14px] text-[#BEBEBE]">
                            {discussion.timestamp}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-lg font-bold my-2">
                        {discussion.title}
                      </h2>
                      <div className="text-gray-800">
                        {discussion.description}
                      </div>
                    </div>

                    <button
                      className="mt-2 w-full h-8 bg-[#ecb45e] hover:bg-[#d9a24b] rounded-b-lg text-white transition duration-200"
                      onClick={() => setIsPopupOpen(!isPopupOpen)}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isPopupOpen && (
        <CommentPopup onClose={() => setIsPopupOpen(!isPopupOpen)} />
      )}
    </div>
  );
};

export default TrDiscussion;
