import React from "react";
import profile from "../assets/profile-circle.png";
import { fetchAllCommentsByPostID } from "../services/api";


const Comment = ({ comment_data }) => {
  return (
    <div className="flex w-auto gap-2">
      <div className="flex flex-col gap-4">
        <img 
          src={profile}
          className="rounded-lg"
          alt={comment_data.user_fullname || "User Profile"}
        />
      </div>
      <div className="flex flex-col rounded-lg p-2">
        <h2>{comment_data.user_fullname}</h2> {/* Use dynamic data */}
        <p>{comment_data.comment_content}</p> {/* Use dynamic data */}
      </div>
    </div>
  );
};

export default Comment;
