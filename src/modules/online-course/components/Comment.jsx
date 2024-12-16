import React from "react";
import profile from "../assets/profile-circle.png";
import { fetchAllCommentsByPostID } from "../services/api";

const Comment = ({ comment_data }) => {
  return (
    <div className="flex gap-4 items-start p-4 border-b border-[#E0E0E0]">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src={profile}
          className="rounded-full object-cover"
          alt={comment_data.user_fullname || "User Profile"}
        />
      </div>

      {/* Comment Content */}
      <div className="flex flex-col flex-1">
        {/* User's Full Name */}
        <h3 className="text-lg font-semibold text-[#333]">
          {comment_data.user_fullname || "Unknown User"}
        </h3>

        {/* Comment Content */}
        <p className="text-sm text-gray-700 mt-1">
          {comment_data.comment_content || "No content available."}
        </p>
      </div>
    </div>
  );
};

export default Comment;
