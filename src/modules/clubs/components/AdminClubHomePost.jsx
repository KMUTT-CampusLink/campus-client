// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import ClubHomePostEditModal from "./ClubHomePostEditModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import ParticipantsModal from "./ParticipantsModal";

// const ClubHomePost = (props) => {
//   const { clubId } = useParams();
//   const [toggleVisiblity, setToggleVisible] = useState(false); // false for posts, true for announcements
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({});
//   const [activeButton, setActiveButton] = useState("post");

//   const [clubPost, setClubPost] = useState([]);
//   const [clubAnnouncement, setClubAnnouncement] = useState([]);

//   const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);


//   // Fetch posts
//   const fetchClubPost = async () => {
//     try {
//       const response = await axiosInstance.get(`/clubs/posts/${clubId}`);
//       setClubPost(response.data.data);
//     } catch (err) {
//       console.error("Error fetching club post:", err);
//       setClubPost([]);
//     }
//   };

//   // Fetch announcements
//   const fetchClubAnnouncement = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/clubs/announcements/${clubId}`
//       );
//       setClubAnnouncement(response.data.data);
//     } catch (err) {
//       console.error("Error fetching club announcement:", err);
//       setClubAnnouncement([]);
//     }
//   };

//   const updateAnnouncement = (updatedData) => {
//     setClubAnnouncement((prevAnnouncements) =>
//       prevAnnouncements.map((announcement) =>
//         announcement.id === updatedData.id ? updatedData : announcement
//       )
//     );
//   };

//   const updatePost = (updatedData) => {
//     setClubPost((prevPosts) =>
//       prevPosts.map((post) => (post.id === updatedData.id ? updatedData : post))
//     );
//   };

//   useEffect(() => {
//     fetchClubPost();
//   }, [clubId]);

//   useEffect(() => {
//     fetchClubAnnouncement();
//   }, [clubId]);

//   // Sort posts and announcements by pin status
//   const sortByPin = (list) =>
//     list.sort((a, b) =>
//       b.is_pinned === a.is_pinned ? 0 : b.is_pinned ? 1 : -1
//     );

//   // Toggle pin status for posts or announcements
//   const togglePin = async (id, type) => {
//     try {
//       const response = await axiosInstance.patch(
//         `/clubs/${type === "post" ? "post" : "announcements"}/${id}/pin`
//       );

//       if (type === "post") {
//         const updatedPost = response.data.data;
//         setClubPost((prevPosts) =>
//           sortByPin(
//             prevPosts.map((post) =>
//               post.id === updatedPost.id ? updatedPost : post
//             )
//           )
//         );
//       } else {
//         const updatedAnnouncement = response.data.data;
//         setClubAnnouncement((prevAnnouncements) =>
//           sortByPin(
//             prevAnnouncements.map((announcement) =>
//               announcement.id === updatedAnnouncement.id
//                 ? updatedAnnouncement
//                 : announcement
//             )
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling pin status:", error);
//     }
//   };

//   // Format date
//   function getFormattedDate(date) {
//     if (!date) return "N/A"; // Return a default value if dateTime is undefined
//     const parseDate = new Date(date);
//     const day = String(parseDate.getDate()).padStart(2, "0");
//     const month = String(parseDate.getMonth() + 1).padStart(2, "0");
//     const year = parseDate.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // Format time
//   function getFormattedTime(time) {
//     if (!time) return "N/A"; // Return a default value if dateTime is undefined
//     const parseTime = new Date(time);
//     if (isNaN(parseTime)) return "Invalid Time";
//     const hours = String(parseTime.getUTCHours()).padStart(2, "0");
//     const minutes = String(parseTime.getUTCMinutes()).padStart(2, "0");
//     return `${hours}:${minutes}`;
//   }

//   // Toggle between posts and announcements
//   const triggerFunction = (e) => {
//     const { id } = e.target;
//     setActiveButton(id);
//     setToggleVisible(id === "announcement");
//   };

//   // Open and close modal for editing
//   const openModal = (item) => {
//     setModalData(item);
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalData(null);
//     setIsModalOpen(false);
//   };

//   const { toggleLeft } = props;
//   const itemsToDisplay = toggleVisiblity ? clubAnnouncement : clubPost;

//   const deleteItem = async (id) => {
//     try {
//       const endpoint = toggleVisiblity
//         ? `/clubs/announcements/${id}`
//         : `/clubs/posts/${id}`;
//       await axiosInstance.delete(endpoint);

//       if (toggleVisiblity) {
//         setClubAnnouncement((prevAnnouncements) =>
//           prevAnnouncements.filter((announcement) => announcement.id !== id)
//         );
//       } else {
//         setClubPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
//       }
//     } catch (error) {
//       console.error(
//         `Error deleting ${toggleVisiblity ? "announcement" : "post"}:`,
//         error
//       );
//     }
//   };

//   return (
//     <div
//       className={` ${
//         toggleLeft ? "grid" : "hidden"
//       } md:grid border-[1px] md:rounded-r-none p-4 md:h-[60vh] md:border-b-0`}
//     >
//       <h1 className="text-center text-lg md:text-2xl font-bold mb-4">
//         Schedule and Announcements
//       </h1>
//       <div>
//         <button
//           onClick={triggerFunction}
//           id="post"
//           className={`${
//             activeButton === "post" ? "bg-orange-600" : "bg-[#864E41]"
//           } text-white px-3 md:px-10 py-1 md:py-2 rounded-lg mr-3 md:mr-8`}
//         >
//           View Post
//         </button>
//         <button
//           onClick={triggerFunction}
//           id="announcement"
//           className={`${
//             activeButton === "announcement" ? "bg-orange-600" : "bg-[#864E41]"
//           } text-white px-3 md:px-10 py-1 md:py-2 rounded-lg`}
//         >
//           View Event
//         </button>
//       </div>
//       {itemsToDisplay.length === 0 ? (
//         <p className="text-center text-gray-500 mt-6">
//           There are no {toggleVisiblity ? "announcements" : "posts"} available.
//         </p>
//       ) : (
//         itemsToDisplay.map((item) => (
//           <div
//             key={item.id}
//             className="m-4 p-4 pt-0 md:p-6 border-solid border-[2px] border-black rounded-lg h-max text-base"
//           >
//             <div className="relative">
//               <button
//                 className="absolute top-2 right-2"
//                 onClick={() =>
//                   togglePin(item.id, toggleVisiblity ? "announcement" : "post")
//                 }
//               >
//                 <FontAwesomeIcon
//                   icon={faThumbtack}
//                   className={`text-2xl ${
//                     item.is_pinned ? "text-orange-600" : "text-gray-400"
//                   }`}
//                 />
//               </button>
//               {/* <div className="text-left mr-2 text-lg md:text-xl mt-3 font-semibold mb-4">
//               {item.title}
//             </div> */}
//             </div>
//             <div className="flex flex-col md:flex-row text-left md:w-3/5">
//               {!toggleVisiblity && (
//                 <img
//                   src={`${import.meta.env.VITE_MINIO_URL}${
//                     import.meta.env.VITE_MINIO_BUCKET_NAME
//                   }/${item.post_img}`}
//                   alt="Post image"
//                   className="sm:grid-flow-col w-[60%] h-[60%] border-solid rounded-2xl mt-4 sm:mb-4"
//                 />
//               )}
//               <div className="md:ml-10 mt-4 inline-flex items-start">
//                 <div className="text-left mr-2 text-lg md:text-xl font-semibold">
//                   {item.title}
//                   <p className="md:mt-4 sm:mt-0 text-base">• {item.content}</p>
//                 </div>
//               </div>
//             </div>
//             {toggleVisiblity && (
//               <div className="mt-3 mb-3">
//                 <p>Date: {getFormattedDate(item.date)}</p>
//                 <p>
//                   Time: {getFormattedTime(item.start_time)} -{" "}
//                   {getFormattedTime(item.end_time)}
//                 </p>
//                 <p>Location: {item.location}</p>
//                 <p>Seats: {item.max_seats}</p>
//                 <p>Ticket Amount: {item.price}</p>
//               </div>
//             )}
//             <div className="flex items-end w-max ml-auto">
//               {toggleVisiblity && (
//                 <button
//                   onClick={() => openModal(item)}
//                   className="bg-[#F69800] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
//                 >
//                   View
//                 </button>
//               )}
//               <button
//                 onClick={() => openModal(item)}
//                 className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteItem(item.id)}
//                 className="bg-[#EC5A51] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//       <ClubHomePostEditModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         data={modalData}
//         onUpdate={toggleVisiblity ? updateAnnouncement : updatePost}
//         toggleVisibility={toggleVisiblity}
//       />
//     </div>
//   );
// };

// export default ClubHomePost;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClubHomePostEditModal from "./ClubHomePostEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../utils/axiosInstance";
import ParticipantsModal from "./ParticipantsModal";

const ClubHomePost = (props) => {
  const { clubId } = useParams();
  const [toggleVisiblity, setToggleVisible] = useState(false); // false for posts, true for announcements
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [activeButton, setActiveButton] = useState("post");

  const [clubPost, setClubPost] = useState([]);
  const [clubAnnouncement, setClubAnnouncement] = useState([]);

  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);


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

  const updateAnnouncement = (updatedData) => {
    setClubAnnouncement((prevAnnouncements) =>
      prevAnnouncements.map((announcement) =>
        announcement.id === updatedData.id ? updatedData : announcement
      )
    );
  };

  const updatePost = (updatedData) => {
    setClubPost((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedData.id ? updatedData : post))
    );
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

  const deleteItem = async (id) => {
    try {
      const endpoint = toggleVisiblity
        ? `/clubs/announcements/${id}`
        : `/clubs/posts/${id}`;
      await axiosInstance.delete(endpoint);

      if (toggleVisiblity) {
        setClubAnnouncement((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement.id !== id)
        );
      } else {
        setClubPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error(
        `Error deleting ${toggleVisiblity ? "announcement" : "post"}:`,
        error
      );
    }
  };

  return (
    <div
      className={`${
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
        itemsToDisplay.map((item) => (
          <div
            key={item.id}
            className="m-4 p-4 pt-0 md:p-6 border-solid border-[2px] border-black rounded-lg h-max text-base"
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
            </div>
  
            <div className="flex flex-col md:flex-row text-left md:w-3/5">
              {!toggleVisiblity && (
                <img
                  src={`${import.meta.env.VITE_MINIO_URL}${
                    import.meta.env.VITE_MINIO_BUCKET_NAME
                  }/${item.post_img}`}
                  alt="Post image"
                  className="sm:grid-flow-col w-[60%] h-[60%] border-solid rounded-2xl mt-4 sm:mb-4"
                />
              )}
              <div className="md:ml-10 mt-4 inline-flex items-start">
                <div className="text-left mr-2 text-lg md:text-xl font-semibold">
                  {item.title}
                  <p className="md:mt-4 sm:mt-0 text-base">• {item.content}</p>
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
                <p>Seats: {item.max_seats}</p>
                <p>Ticket Amount: {item.price}</p>
              </div>
            )}
  
            <div className="flex items-end w-max ml-auto">
              {toggleVisiblity && (
                <button
                  onClick={() => {
                    setSelectedEventId(item.id);
                    setIsParticipantsModalOpen(true);
                  }}
                  className="bg-[#F69800] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
                >
                  View
                </button>
              )}
              <button
                onClick={() => openModal(item)}
                className="bg-[#864E41] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg mr-3 md:mr-8"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-[#EC5A51] text-white px-3 md:px-8 py-1 md:py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
  
      {/* Participant Modal */}
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
        eventId={selectedEventId}
      />
  
      <ClubHomePostEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={modalData}
        onUpdate={toggleVisiblity ? updateAnnouncement : updatePost}
        toggleVisibility={toggleVisiblity}
      />
    </div>
  );  
};

export default ClubHomePost;
