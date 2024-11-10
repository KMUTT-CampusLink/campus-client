import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClubHomePostEditModal from "./ClubHomePostEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../utils/axiosInstance";

const ClubHomePost = (props) => {
  const { clubId } = useParams();
  const [toggleVisiblity, setToggleVisible] = useState(false); // false for posts, true for announcements
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [activeButton, setActiveButton] = useState("post");

  const [clubPost, setClubPost] = useState([]);
  const [clubAnnouncement, setClubAnnouncement] = useState([]);

  // Fetch posts
  const fetchClubPost = async () => {
    try {
      const response = await axiosInstance.get(`/clubs/posts/${clubId}`);
      setClubPost(response.data.data);
    } catch (err) {
      console.error("Error fetching club post:", err);
      setClubPost([]);
    }
  };

  // Fetch announcements
  const fetchClubAnnouncement = async () => {
    try {
      const response = await axiosInstance.get(
        `/clubs/announcements/${clubId}`
      );
      setClubAnnouncement(response.data.data);
    } catch (err) {
      console.error("Error fetching club announcement:", err);
      setClubAnnouncement([]);
    }
  };

  useEffect(() => {
    fetchClubPost();
  }, [clubId]);

  useEffect(() => {
    fetchClubAnnouncement();
  }, [clubId]);

  // Sort posts and announcements by pin status
  const sortByPin = (list) =>
    list.sort((a, b) =>
      b.is_pinned === a.is_pinned ? 0 : b.is_pinned ? 1 : -1
    );

  // Toggle pin status for posts or announcements
  const togglePin = async (id, type) => {
    try {
      const response = await axiosInstance.patch(
        `/clubs/${type === "post" ? "post" : "announcements"}/${id}/pin`
      );

      if (type === "post") {
        const updatedPost = response.data.data;
        setClubPost((prevPosts) =>
          sortByPin(
            prevPosts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          )
        );
      } else {
        const updatedAnnouncement = response.data.data;
        setClubAnnouncement((prevAnnouncements) =>
          sortByPin(
            prevAnnouncements.map((announcement) =>
              announcement.id === updatedAnnouncement.id
                ? updatedAnnouncement
                : announcement
            )
          )
        );
      }
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  // Format date
  function getFormattedDate(dateTime) {
    if (!dateTime) return "N/A"; // Return a default value if dateTime is undefined
    const [date] = dateTime.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  // Format time
  function getFormattedTime(dateTime) {
    if (!dateTime) return "N/A"; // Return a default value if dateTime is undefined
    const [, time] = dateTime.split(" ");
    return time;
  }

  // Toggle between posts and announcements
  const triggerFunction = (e) => {
    const { id } = e.target;
    setActiveButton(id);
    setToggleVisible(id === "announcement");
  };

  // Open and close modal for editing
  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  const { toggleLeft } = props;
  const itemsToDisplay = toggleVisiblity ? clubAnnouncement : clubPost;

  return (
    <div
      className={` ${
        toggleLeft ? "grid" : "hidden"
      } md:grid border-[1px] md:rounded-r-none p-4 md:h-[60vh] md:border-b-0`}
    >
      <h1 className="text-center text-lg md:text-2xl font-bold mb-4">
        Schedule and Announcements
      </h1>
      <div>
        <button
          onClick={triggerFunction}
          id="post"
          className={`${
            activeButton === "post" ? "bg-orange-600" : "bg-[#864E41]"
          } text-white px-3 md:px-10 py-1 md:py-2 rounded-lg mr-3 md:mr-8`}
        >
          View Post
        </button>
        <button
          onClick={triggerFunction}
          id="announcement"
          className={`${
            activeButton === "announcement" ? "bg-orange-600" : "bg-[#864E41]"
          } text-white px-3 md:px-10 py-1 md:py-2 rounded-lg`}
        >
          View Announcement
        </button>
      </div>
      {itemsToDisplay.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          There are no {toggleVisiblity ? "announcements" : "posts"} available.
        </p>
      ) : (
        itemsToDisplay.map((item) => (
          <div
            key={item.id}
            className="m-4 p-4 pt-0 md:p-6 border-solid border-[1px] rounded-lg h-max text-base"
          >
            <div className="relative">
              <button
                className="absolute top-2 right-2"
                onClick={() =>
                  togglePin(item.id, toggleVisiblity ? "announcement" : "post")
                }
              >
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className={`text-2xl ${
                    item.is_pinned ? "text-orange-600" : "text-gray-400"
                  }`}
                />
              </button>
              <div className="text-left mr-2 text-lg md:text-xl mt-3 font-semibold mb-4">
                {item.title}
              </div>
            </div>
            <div className="flex flex-col md:flex-row text-left md:w-3/5">
              {!toggleVisiblity && (
                <img
                  src={item.img_url}
                  alt="Post image"
                  className="sm:grid-flow-col"
                />
              )}
              <div className="inline-flex items-start mt-3 mb-4">
                <span className="mx-2">•</span>
                <p>{item.content}</p>
              </div>
            </div>
            {toggleVisiblity && (
              <div className="mt-3 mb-3">
                <p>{item.location}</p>
                <p>{getFormattedDate(item.date)}</p>
                <p>{getFormattedTime(item.time)}</p>
              </div>
            )}
            <div className="flex items-end w-max ml-auto">
              <button
                onClick={() => openModal(item)}
                className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
              >
                Edit
              </button>
              <button className="bg-[#EC5A51] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <ClubHomePostEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={modalData}
      />
    </div>
  );
};

export default ClubHomePost;
