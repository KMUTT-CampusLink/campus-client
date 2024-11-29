import React, { useState } from "react";
import profile from "../assets/profile-circle.png";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAllCommentsByPostID } from "../services/queries";
import { useCreateDiscussionReply } from "../services/mutations";

const CommentPopup = ({ closePopup, postDetails }) => {
  const [newComment, setNewComment] = useState("");
  const {
    data: comments,
    isLoading,
    error,
  } = useAllCommentsByPostID(postDetails?.id);
  const createReplyMutation = useCreateDiscussionReply();

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;

  const handleCreateReply = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      await createReplyMutation.mutateAsync({
        topicId: postDetails.id,
        newReply: {
          topic_id: postDetails.id,
          user_id: localStorage.getItem("userId"),
          content: newComment,
        },
      });
      setNewComment("");
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx p-6 relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-black"
        onClick={closePopup}
      >
        <FontAwesomeIcon icon={faCircleXmark} size="lg" color="red" />
      </button>

      {/* Post Details */}
      <div className="flex flex-col px-4 pt-6 pb-4 border-b-[1px] border-[#BEBEBE]">
        <div className="flex gap-4 items-center">
          <img src={profile} className="rounded-lg" alt="Profile" />
          <div>
            <h2 className="text-md font-semibold">
              {postDetails?.ownerName || "Unknown User"}
            </h2>
            <span className="text-sm text-gray-500">
              {new Date(postDetails?.createdAt).toLocaleString() ||
                "Unknown Time"}
            </span>
          </div>
        </div>
        {comments?.[0]?.topic_title && (
          <div className="ml-[6%] mt-4">
            <h2 className="font-bold mb-2">
              {comments[0].topic_title}
            </h2>
            <p>{comments[0].topic_content || "No content available."}</p>
          </div>
        )}

      </div>

      {/* Comments Section */}
      <div className="py-4 px-5 flex flex-col overflow-auto h-[300px]">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.comment_id} comment_data={comment} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* New Comment Input */}
      <div className="relative flex items-center gap-4 p-2 w-full">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-4 bg-[#F5F5F5] border border-[#D9D9D980] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ecb45e] placeholder-gray-500 resize-none overflow-hidden"
          placeholder="Write your comment here..."
          rows="1" // Starts with one line
          onInput={(e) => {
            // Adjust height based on content, with max height of 100px
            e.target.style.height = "auto"; // Reset height to auto first
            e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`; // Set height dynamically, up to 100px
          }}
          style={{
            minHeight: '40px',  // Minimum height
            maxHeight: '100px', // Maximum height limit
          }}
        />
        {/* Post Button */}
        <button
          onClick={handleCreateReply}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ecb45e] hover:text-[#d9a24b] flex items-center justify-center p-2 pr-5"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div>



    </div>
  );
};

export default CommentPopup;
