import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profile-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CommentPopup from "../../components/CommentPopup";
import PopupDiscussion from "../../components/PopupDiscussion"; // New popup component for upload
import {
  useAllDiscussionPostsBySectionID,
  useCourseHeaderBySectionID,
} from "../../services/queries";
import {
  useEditDiscussionPost,
  useDeleteDiscussionPost,
  useDiscussionPostBySectionID,
} from "../../services/mutations";
import CourseHeader from "../../components/CourseHeader";

const StDiscussion = () => {
  const sec_id = localStorage.getItem("sec_id");
  const loggedInUserId = localStorage.getItem("userId"); // Get logged-in user ID

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: posts } = useAllDiscussionPostsBySectionID(sec_id);

  const editMutation = useEditDiscussionPost(); // Mutation for editing
  const deleteMutation = useDeleteDiscussionPost(); // Mutation for deleting
  const createMutation = useDiscussionPostBySectionID(); // Mutation for creating a post

  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const openCommentPopup = () => setIsCommentPopupOpen(true);
  const closeCommentPopup = () => setIsCommentPopupOpen(false);

  const openUploadPopup = () => setIsUploadPopupOpen(true);
  const closeUploadPopup = () => setIsUploadPopupOpen(false);

  const handleSubmission = async (newTopic) => {
    try {
      await createMutation.mutateAsync(newTopic, {
        onSuccess: () => {
          alert("Post created successfully!");
          closeUploadPopup(); // Close the popup after successful submission
        },
      });
    } catch (error) {
      console.error("Error creating discussion:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const handleEdit = (post) => {
    const updatedPost = { ...post, title: "Updated Title" }; // Example update logic
    editMutation.mutate(
      { topicId: post.id, updatedPost },
      {
        onSuccess: () => alert("Post updated successfully!"),
        onError: (error) => console.error("Failed to update post:", error),
      }
    );
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId, {
        onSuccess: () => alert("Post deleted successfully!"),
        onError: (error) => console.error("Failed to delete post:", error),
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <NavForIndvCourse page={"discussion"} />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      {!isCommentPopupOpen && !isUploadPopupOpen && (
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
                    onClick={() => setDropDownOpen(false)}
                  >
                    Sort by time
                  </p>
                  <p
                    className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                    onClick={() => setDropDownOpen(false)}
                  >
                    Sort by title
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex justify-center items-center max-w-xs mx-auto mb-6">
            <div className="border border-gray-300 rounded-md w-full h-48 flex flex-col items-center justify-center p-4">
              <img src={gallery} alt="Upload Icon" className="w-12 h-12 mb-2" />
              <div className="text-center">
                <h2 className="text-lg font-bold"># Title</h2>
                <p className="text-gray-500">Upload here!</p>
              </div>
              <button
                className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white py-2 mt-4 rounded-md flex items-center justify-center"
                onClick={openUploadPopup}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> Upload
              </button>
            </div>
          </div>

          {/* Discussion Area */}
          <div className="lg:w-3/4 mx-auto">
            <h2 className="text-2xl font-bold text-[#ecb45e] mb-4 text-center lg:text-left">
              Discussion Area
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {posts?.map((discussion) => (
                <div
                  key={discussion.id}
                  className="border border-gray-300 rounded-lg p-4 flex flex-col justify-between relative"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={profile} alt="Profile" className="w-10 h-10" />
                      <div>
                        <h3 className="text-sm font-semibold">
                          {discussion.owner_name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(discussion.create_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-md font-semibold">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {discussion.content}
                    </p>
                  </div>
                  <button
                    className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white py-2 rounded-md"
                    onClick={openCommentPopup}
                  >
                    Comment
                  </button>

                  {/* Edit and Delete Buttons */}
                  {loggedInUserId === discussion.user_id && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleEdit(discussion)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(discussion.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isCommentPopupOpen && <CommentPopup closePopup={closeCommentPopup} />}
      {isUploadPopupOpen && (
        <PopupDiscussion
          closePopup={closeUploadPopup}
          onSubmit={handleSubmission}
        />
      )}
    </div>
  );
};

export default StDiscussion;
