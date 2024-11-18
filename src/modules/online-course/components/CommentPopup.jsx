import React from "react";
import profile from "../assets/profile-circle.png";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CommentPopup = ({closePopup}) => {
  return (
    <div className="relative w-full  h-full flex items-center justify-center">
      <div className="bg-white rounded-sm my-10 border-[1px] border-[#BEBEBE] shadow-lg w-[814px] h-[565px] relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-black"
        onClick={closePopup} >
          <FontAwesomeIcon icon={faCircleXmark} size= "" color="red"/>
        </button>
        <div className="flex flex-col px-4 pt-6 pb-4 border-b-[1px] border-[#BEBEBE]">
          <div className="flex gap-4 items-center">
            <img src={profile} className="rounded-lg" />
            <div className="flex flex-col">
              <h2>AKARI KYAW THEIN(66130500801)</h2>
              <span className="text-[#BEBEBE] text-[14px]">30 minutes ago</span>
            </div>
          </div>
          <h2 className="font-bold mt-4 mb-4">#Ch2 1st Complement</h2>
          <p>
            How does the 1's complement representation of negative numbers work
            in binary, and what are its advantages and disadvantages compared to
            2's complement?
          </p>
        </div>
        <div className="py-4 px-5 flex flex-col">
          <Comment />
        </div>
        <div className="flex w-full gap-4 absolute bottom-0 p-4">
          <div className="flex flex-col">
            <img src={profile} className="rounded-lg" />
          </div>
          <input
            className="flex-1 p-4 bg-[#D9D9D980] rounded-lg"
            placeholder="Write your comment here....."
          />
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
