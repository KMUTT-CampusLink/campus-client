import React, { useState } from "react";
import profile from "../assets/profile-circle.png";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
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
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-sm my-10 border-[1px] border-[#BEBEBE] shadow-lg w-[814px] h-[565px] relative">
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
          <div className="ml-[6%] mt-4">
            <h2 className="font-bold mb-2">
              {comments[0]?.topic_title || "Untitled Topic"}
            </h2>
            <p>{comments[0]?.topic_content || "No content available."}</p>
          </div>
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
        <div className="flex w-full gap-4 absolute bottom-0 p-4">
          <div className="flex flex-col">
            <img src={profile} className="rounded-lg" alt="User Profile" />
          </div>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-4 bg-[#D9D9D980] rounded-lg"
            placeholder="Write your comment here....."
          />
          <button
            onClick={handleCreateReply}
            className="bg-[#ecb45e] hover:bg-[#d9a24b] text-white px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
