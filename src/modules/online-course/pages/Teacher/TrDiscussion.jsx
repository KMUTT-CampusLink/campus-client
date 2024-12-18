import React, { useState, useEffect } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import gallery from "../../assets/gallery.png";
import event from "../../assets/event.png";
import profile from "../../assets/profile-circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faEdit,
  faTrash,
  faCommentDots,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import CommentPopup from "../../components/CommentPopup";
import PopupDiscussion from "../../components/PopupDiscussion";
import PopupEvent from "../../components/PopupEvent";
import DEditPopup from "../../components/DEditPopup";
import EventSessionTeacher from "../../components/EventSessionTeacher.jsx";
import ConfirmationPopup from "../../components/ConfirmationPopup"; // Import ConfirmationPopup
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

const TrDiscussion = () => {
  const sec_id = localStorage.getItem("sec_id");
  const loggedInUserId = localStorage.getItem("userId");

  const [refresh, setRefresh] = useState(false);

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: posts } = useAllDiscussionPostsBySectionID(sec_id);

  const editMutation = useEditDiscussionPost();
  const deleteMutation = useDeleteDiscussionPost();
  const createMutation = useDiscussionPostBySectionID();

  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // State for Delete Confirmation popup
  const [selectedPost, setSelectedPost] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(null);

  const openCommentPopup = (post) => {
    setSelectedPost(post); // Pass the entire post object
    setIsCommentPopupOpen(true);
  };

  const closeCommentPopup = () => setIsCommentPopupOpen(false);

  const openUploadPopup = () => setIsUploadPopupOpen(true);
  const closeUploadPopup = () => setIsUploadPopupOpen(false);

  const openEventPopup = () => setIsEventPopupOpen(true);
  const closeEventPopup = () => setIsEventPopupOpen(false);

  const handleEventSubmission = () => {
    setRefresh(true);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (postId) => {
    setSelectedPost({ id: postId }); // Temporarily store the post to delete
    setIsDeletePopupOpen(true); // Open confirmation popup
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id); // Toggle menu visibility
  };

  const confirmDelete = async () => {
    if (selectedPost?.id) {
      try {
        await deleteMutation.mutateAsync(selectedPost.id);
        console.log("Post deleted successfully!");
        setIsDeletePopupOpen(false); // Close confirmation popup
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <NavForIndvCourse page={"discussion"} />
      <div className="py-8">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>

      <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx px-4 sm:px-6 mb-4">

        <div className="flex justify-between items-center lg:w-3/4 mx-auto mb-6 relative pt-2">
          <h2 className="text-2xl font-bold text-[#ecb45e]">Create Event</h2>

        </div>
        {/* Upload Section */}
        <div className="flex justify-center items-center max-w-sm mx-auto mb-6">
          <div className="border rounded-lg w-full h-56 flex flex-col items-center justify-center p-6 bg-gray-50 shadow-md">
            {/* Icon */}
            <img
              src={event}
              alt="Upload Icon"
              className="w-14 h-14 mb-4"
            />
            {/* Text Content */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-1">
                Upload Event
              </h2>
              <p className="text-sm text-gray-500">
                Create Event easily with just one click!
              </p>
            </div>
            {/* Upload Button */}
            <button
              className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white font-medium py-2 mt-4 rounded-lg flex items-center justify-center transition duration-200 shadow-md"
              onClick={openEventPopup}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Event
            </button>
          </div>
        </div>

        <EventSessionTeacher refresh={refresh} />
      </div>

      {!isCommentPopupOpen && (
        <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx px-4 sm:px-6">
          <div className="flex justify-between items-center lg:w-3/4 mx-auto mb-6 relative pt-2">
            <h2 className="text-2xl font-bold text-[#ecb45e]">Create Discussion</h2>
            <div className="relative">
              {/* <button
                className="border bg-white rounded-full shadow-sm px-4 py-2 flex items-center hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              >
                <span className="text-gray-700 font-medium">Sort by time</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#D4A015"
                  className="ml-2"
                />
              </button> */}
              {/* {dropDownOpen && (
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
              )} */}
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex justify-center items-center max-w-sm mx-auto mb-6">
            <div className="border rounded-lg w-full h-56 flex flex-col items-center justify-center p-6 bg-gray-50 shadow-md">
              {/* Icon */}
              <img
                src={gallery}
                alt="Upload Icon"
                className="w-14 h-14 mb-4"
              />
              {/* Text Content */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-1">
                  Upload Post
                </h2>
                <p className="text-sm text-gray-500">
                  Share your thoughts easily with just one click!
                </p>
              </div>
              {/* Upload Button */}
              <button
                className="w-full bg-[#ecb45e] hover:bg-[#d9a24b] text-white font-medium py-2 mt-4 rounded-lg flex items-center justify-center transition duration-200 shadow-md"
                onClick={openUploadPopup}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Upload
              </button>
            </div>
          </div>



          {/* Discussion Area */}
          <div className="lg:w-3/4 mx-auto">
            <h2 className="text-2xl font-bold text-[#ecb45e] mb-4 text-left lg:text-left">
              Discussion Area
            </h2>

            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
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
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{discussion.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 truncate">{discussion.content}</p>

                  </div>

                  {/* Three-dot Menu */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => openCommentPopup({ id: discussion.id, ownerName: discussion.owner_name, createdAt: discussion.create_at })}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faCommentDots} className="text-gray-600" />
                    </button>
                    {discussion.user_id === loggedInUserId && (<button
                      onClick={() => toggleMenu(discussion.id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
                    </button>)}
                    {menuOpen === discussion.id && (
                      <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-20">
                        {discussion.user_id === loggedInUserId && (
                          <>
                            <p
                              className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                              onClick={() => handleEdit(discussion)}
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-2" />
                              Edit
                            </p>
                            <p
                              className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                              onClick={() => handleDelete(discussion.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} className="mr-2" />
                              Delete
                            </p>
                          </>
                        )}
                        <p
                          className="py-2 px-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition"
                          onClick={() => openCommentPopup({ id: discussion.id, ownerName: discussion.owner_name, createdAt: discussion.create_at })}
                        >
                          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                          Comment
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isCommentPopupOpen && (
        <CommentPopup
          closePopup={closeCommentPopup}
          postDetails={selectedPost} // Pass the selected post details
        />
      )}

      {isUploadPopupOpen && (
        <PopupDiscussion
          closePopup={closeUploadPopup}

        />
      )}
      {isEventPopupOpen && (
        <PopupEvent
          closePopup={closeEventPopup}
          onSubmit={handleEventSubmission}
        />
      )}
      {isEditPopupOpen && (
        <DEditPopup
          post={selectedPost}
          closePopup={() => setIsEditPopupOpen(false)}
        />
      )}
      {isDeletePopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeletePopupOpen(false)}
        />
      )}
    </div>
  );
};

export default TrDiscussion;