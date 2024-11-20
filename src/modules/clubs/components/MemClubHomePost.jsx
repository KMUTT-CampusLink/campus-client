import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../utils/axiosInstance";

const MemClubHomePost = (props) => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [toggleVisiblity, setToggleVisible] = useState(false); // false for posts, true for announcements
  const [activeButton, setActiveButton] = useState("post");
  const [clubPost, setClubPost] = useState([]);
  const [clubAnnouncement, setClubAnnouncement] = useState([]);
  const [reservationStatus, setReservationStatus] = useState({}); // Status per announcement

  // Utility functions
  const getFormattedDate = (date) => {
    if (!date) return "N/A";
    const parseDate = new Date(date);
    const day = String(parseDate.getDate()).padStart(2, "0");
    const month = String(parseDate.getMonth() + 1).padStart(2, "0");
    const year = parseDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getFormattedTime = (time) => {
    if (!time) return "N/A";
    const parseTime = new Date(time);
    if (isNaN(parseTime)) return "Invalid Time";
    const hours = String(parseTime.getUTCHours()).padStart(2, "0");
    const minutes = String(parseTime.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
      const announcements = response.data.data;
      setClubAnnouncement(announcements);

      // Fetch reservation status for each announcement
      const userId = localStorage.getItem("userId");
      const statusPromises = announcements.map(async (announcement) => {
        const statusResponse = await axiosInstance.post(
          "/clubs/events/status",
          {
            clubAnnouncementId: announcement.id,
            userId,
          }
        ); // Send data in the body
        console.log(
          `Status for announcement ${announcement.id}:`,
          statusResponse.data
        ); // Debug log
        return { id: announcement.id, status: statusResponse.data.status };
      });

      const statuses = await Promise.all(statusPromises);
      const statusMap = statuses.reduce((acc, { id, status, invoiceId }) => {
        acc[id] = { status, invoiceId };
        return acc;
      }, {});
      setReservationStatus(statusMap);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setClubAnnouncement([]);
    }
  };

  useEffect(() => {
    fetchClubPost();
  }, [clubId]);

  useEffect(() => {
    fetchClubAnnouncement();
  }, [clubId]);

  // Toggle between posts and announcements
  const triggerFunction = (e) => {
    const { id } = e.target;
    setActiveButton(id);
    setToggleVisible(id === "announcement");
  };

  const reserveSeat = async (clubAnnouncementId) => {
    try {
      const userId = localStorage.getItem("userId");
      const payload = { clubAnnouncementId, userId };

      const response = await axiosInstance.post(
        "clubs/events/reserve",
        payload
      );

      if (response.data.success) {
        alert("Reservation successful!");
        const { invoice } = response.data.data;
        setReservationStatus((prevState) => ({
          ...prevState,
          [clubAnnouncementId]: { status: "Unpaid", invoiceId: invoice.id },
        }));
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
      } else {
        console.error("Reservation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
  };

  const handlePendingPayment = (invoiceId) => {
    navigate(`/payment/payment-invoice/${invoiceId}`); // Navigate to the payment page
  };

  const getButton = (statusObj, announcementId) => {
    const { status, invoiceId } = statusObj || {};
    if (status === "Unreserved") {
      return (
        <button
          onClick={() => reserveSeat(announcementId)}
          className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg"
        >
          Reserve
        </button>
      );
    }
    if (status === "Unpaid") {
      if (!invoiceId) {
        console.error(`Missing invoiceId for announcement ${announcementId}`);
        return null;
      }
      return (
        <button
          onClick={() => handlePendingPayment(invoiceId)}
          className="bg-yellow-500 text-white px-3 md:px-8 py-1 md:py-2 rounded-lg"
        >
          Pending Payment
        </button>
      );
    }
    if (status === "Paid") {
      return (
        <button
          className="bg-green-600 text-white px-3 md:px-8 py-1 md:py-2 rounded-lg"
          disabled
        >
          Reserved
        </button>
      );
    }
    return null;
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
        itemsToDisplay.map((item) => {
          const availableSeats =
            (item.max_seats || 0) - (item.reserved_seats || 0);
          const statusObj = reservationStatus[item.id] || "Unreserved";

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
                {/* <div className="text-left mr-2 text-lg md:text-xl mt-3 font-semibold mb-4">
                  {item.title}
                </div> */}
              </div>
              <div className="flex flex-col md:flex-row text-left md:w-3/5">
                {!toggleVisiblity && (
                  <img
                    src={`${import.meta.env.VITE_MINIO_URL}${
                      import.meta.env.VITE_MINIO_BUCKET_NAME
                    }/${item.post_img}`}
                    alt="Post image"
                    className="sm:grid-flow-col w-[60%] h-[60%] border-solid rounded-2xl md:mt-0 sm:mt-4 sm:mb-4"
                  />
                )}
                <div className="md:ml-10 inline-flex items-start">
                  <div className="text-left mr-2 text-lg md:text-xl font-semibold">
                    {item.title}
                    <p className="md:mt-3 sm:mt-0 text-base">
                      • {item.content}
                    </p>
                  </div>
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
                  {getButton(statusObj, item.id)}
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
