import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClubHomePostEditModal from "./ClubHomePostEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../utils/axiosInstance";

const MemClubHomePost = (props) => {
  const { clubId } = useParams();
  const [toggleVisiblity, setToggleVisible] = useState(false); // false for posts, true for announcements
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

  // Format date
  function getFormattedDate(date) {
    if (!date) return "N/A"; // Return a default value if dateTime is undefined
    const parseDate = new Date(date);
    const day = String(parseDate.getDate()).padStart(2, "0");
    const month = String(parseDate.getMonth() + 1).padStart(2, "0");
    const year = parseDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Format time
  function getFormattedTime(time) {
    if (!time) return "N/A"; // Return a default value if dateTime is undefined
    const parseTime = new Date(time);
    if (isNaN(parseTime)) return "Invalid Time";
    const hours = String(parseTime.getUTCHours()).padStart(2, "0");
    const minutes = String(parseTime.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Toggle between posts and announcements
  const triggerFunction = (e) => {
    const { id } = e.target;
    setActiveButton(id);
    setToggleVisible(id === "announcement");
  };

  // Reserve a seat for an announcement
  // const reserveSeat = async (id) => {
  //   try {
  //     const response = await axiosInstance.patch(`/clubs/events/${id}/reserve`);
  //     if (response.data.success) {
  //       // Update the reserved_seat value locally
  //       setClubAnnouncement((prevAnnouncements) =>
  //         prevAnnouncements.map((announcement) =>
  //           announcement.id === id
  //             ? {
  //                 ...announcement,
  //                 reserved_seat: response.data.data.reserved_seat,
  //               }
  //             : announcement
  //         )
  //       );
  //       alert("Seat reserved successfully!");
  //     } else {
  //       console.error("Failed to reserve seat:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error reserving seat:", error);
  //   }
  // };
  const reserveSeat = async (clubAnnouncementId) => {
    try {
      // Payload for the API
      const payload = {
        clubAnnouncementId,
        userId: "d65ccd3d-4948-416a-9ace-2978cbc8c24b", // Replace with actual user ID
      };
  
      // Send API request
      const response = await axiosInstance.post("clubs/events/reserve", payload);
  
      if (response.data.success) {
        // Update local state for reserved_seats
        setClubAnnouncement((prevAnnouncements) =>
          prevAnnouncements.map((announcement) =>
            announcement.id === clubAnnouncementId
              ? {
                  ...announcement,
                  reserved_seats: (announcement.reserved_seats || 0) + 1,
                }
              : announcement
          )
        );
        alert("Reservation successful!");
      } else {
        console.error("Reservation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
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
          View Event
        </button>
      </div>
      {itemsToDisplay.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          There are no {toggleVisiblity ? "announcements" : "posts"} available.
        </p>
      ) : (
        //   itemsToDisplay.map((item) => (
        //     <div
        //       key={item.id}
        //       className="m-4 p-4 pt-0 md:p-6 border-solid border-[2px] border-black rounded-lg h-max text-base"
        //     >
        //       <div className="relative">
        //         <button
        //           className="absolute top-2 right-2"
        //           onClick={() =>
        //             togglePin(item.id, toggleVisiblity ? "announcement" : "post")
        //           }
        //         >
        //           <FontAwesomeIcon
        //             icon={faThumbtack}
        //             className={`text-2xl ${
        //               item.is_pinned ? "text-orange-600" : "text-gray-400"
        //             }`}
        //           />
        //         </button>
        //         <div className="text-left mr-2 text-lg md:text-xl mt-3 font-semibold mb-4">
        //           {item.title}
        //         </div>
        //       </div>
        //       <div className="flex flex-col md:flex-row text-left md:w-3/5">
        //         {!toggleVisiblity && (
        //           <img
        //             src={item.img_url}
        //             alt="Post image"
        //             className="sm:grid-flow-col"
        //           />
        //         )}
        //         <div className="inline-flex items-start mt-3 mb-4">
        //           <span className="mx-2">•</span>
        //           <p>{item.content}</p>
        //         </div>
        //       </div>
        //       {toggleVisiblity && (
        //         <div className="mt-3 mb-3">
        //           <p>Date: {getFormattedDate(item.date)}</p>
        //           <p>Time: {getFormattedTime(item.start_time)} - {getFormattedTime(item.end_time)}</p>
        //           <p>Location: {item.location}</p>
        //           <p>Available Seats: {availableSeats}</p>
        //         </div>
        //       )}
        //       {toggleVisiblity && ( <div className="flex items-end w-max ml-auto">
        //         <button
        //           onClick={() => reserveSeat(item.id)}
        //           className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
        //         >
        //           Reserve
        //         </button>
        //       </div>
        //       )}
        //     </div>
        //   ))
        // )}

        itemsToDisplay.map((item) => {
          const availableSeats =
            (item.max_seats || 0) - (item.reserved_seats || 0);
          return (
            <div
              key={item.id}
              className="m-4 p-4 pt-0 md:p-6 border-solid border-[2px] border-black rounded-lg h-max text-base"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className={`absolute top-2 right-2 text-2xl ${
                    item.is_pinned ? "text-orange-600" : "text-gray-400"
                  }`}
                />
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
                  <p>Date: {getFormattedDate(item.date)}</p>
                  <p>
                    Time: {getFormattedTime(item.start_time)} -{" "}
                    {getFormattedTime(item.end_time)}
                  </p>
                  <p>Location: {item.location}</p>
                  <p>Available Seats: {availableSeats}</p>
                  <p>Price: {item.price}</p>
                </div>
              )}
              {toggleVisiblity && (
                <div className="flex items-end w-max ml-auto">
                  <button
                    onClick={() => reserveSeat(item.id)}
                    className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
                  >
                    Reserve
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MemClubHomePost;
