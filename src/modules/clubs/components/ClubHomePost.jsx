// import React from "react";

// const ClubHomePost = (props) => {
//   const { toggleLeft } = props;
//   return (
//     <div
//       className={` ${
//         toggleLeft ? "grid" : "hidden"
//       } md:grid border-[1px] border-black rounded-lg md:rounded-r-none p-4 h-min md:border-b-0`}
//     >
//       <h1 className="text-center text-base md:text-xl font-bold">
//         Schedule and Announcements
//       </h1>
//       <div className="m-4 p-4 md:p-6 border-solid border-[1px] border-black rounded-lg h-max text-base">
//         <div className="text-left">Weekly Training Schedule:</div>
//         <div className="flex text-left md:w-2/5">
//           <span className="mx-2">•</span>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut
//             aliquip ex ea commodo consequat.
//           </p>
//         </div>
//       </div>
//       <div className="m-4 p-4 md:p-6 border-solid border-[1px] border-black rounded-lg h-max text-base">
//         <div className="text-left">Charity Football Match</div>
//         <div className="flex text-left md:w-2/5">
//           <span className="mx-2">•</span>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut
//             aliquip ex ea commodo consequat.
//           </p>
//         </div>
//       </div>
//       <div className="m-4 p-4 md:p-6 border-solid border-[1px] border-black rounded-lg h-max text-base">
//         <div className="text-left">Charity Football Match</div>
//         <div className="flex text-left md:w-2/5">
//           <span className="mx-2">•</span>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut
//             aliquip ex ea commodo consequat.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ClubHomePost;
import React from "react";
import { useState, useEffect } from "react";
import ClubHomePostEditModal from "./ClubHomePostEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

const ClubHomePost = (props) => {
  const [toggleVisiblity, setToggleVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [activeButton, setActiveButton] = useState("post");


  const [clubPost, setClubPost] = useState([
    {
      id: 1,
      title: "Welcome to the Club!",
      content:
        "This is an introductory post to welcome all new members to our club. Feel free to introduce yourself in the comments!",
      club_id: 101,
      member_id: 201,
      created_at: "2024-09-15 10:30:00",
      updated_at: "2024-09-15 10:30:00",
      ispin: true,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPs3E0fbCiZr23JRJgqMQpdL3wVcF6XLa-w&s",
    },
    {
      id: 2,
      title: "Monthly Event - Chess Tournament",
      content:
        "Our monthly chess tournament is coming up on the 25th of this month. Register now to participate and win exciting prizes!",
      club_id: 102,
      member_id: 202,
      created_at: "2024-09-10 14:45:00",
      updated_at: "2024-09-12 09:20:00",
      ispin: true,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPs3E0fbCiZr23JRJgqMQpdL3wVcF6XLa-w&s",
    },
    {
      id: 3,
      title: "Photography Tips for Beginners",
      content:
        "In this post, we'll be sharing some basic tips to get started with photography. Grab your camera and join the fun!",
      club_id: 103,
      member_id: 203,
      created_at: "2024-08-22 08:15:00",
      updated_at: "2024-08-22 08:15:00",
      ispin: false,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPs3E0fbCiZr23JRJgqMQpdL3wVcF6XLa-w&s",
    },
    {
      id: 4,
      title: "Weekly Coding Challenge#5",
      content:
        "Submit your solutions for this week's coding challenge by Sunday night. Check the attached file for details!",
      club_id: 104,
      member_id: 204,
      created_at: "2024-10-01 18:00:00",
      updated_at: "2024-10-03 12:30:00",
      ispin: false,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPs3E0fbCiZr23JRJgqMQpdL3wVcF6XLa-w&s",
    },
    {
      id: 5,
      title: "Club Meeting Minutes - October",
      content:
        "Here are the minutes from our latest club meeting. Thanks to all who attended!",
      club_id: 101,
      member_id: 205,
      created_at: "2024-10-05 09:50:00",
      updated_at: "2024-10-05 09:50:00",
      ispin: false,
      img_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPs3E0fbCiZr23JRJgqMQpdL3wVcF6XLa-w&s",
    },
  ]);

  const [clubAnnouncement, setClubAnnouncement] = useState([
    {
      id: 1,
      title: "Club Closure Due to Weather",
      content:
        "Due to severe weather conditions, all club activities are suspended until further notice. Stay safe!",
      club_id: 101,
      member_id: 201,
      created_at: "2024-10-10 07:30:00",
      updated_at: "2024-10-10 07:30:00",
      date: "2024-10-10",
      time: "07:30:00",
      location: "Local Business District",
      ispin: true,
      img_url: "https://i.imgur.com/nfRz5Yl.jpg",
    },
    {
      id: 2,
      title: "Annual General Meeting Announcement",
      content:
        "We are pleased to announce that the AGM will take place on November 1st. All members are encouraged to attend.",
      club_id: 102,
      member_id: 202,
      created_at: "2024-09-25 12:15:00",
      updated_at: "2024-09-25 12:15:00",
      date: "2024-11-01",
      time: "12:15:00",
      location: "Club Store",
      ispin: false,
      img_url: "https://i.imgur.com/wJqXhn9.jpg",
    },
    {
      id: 3,
      title: "Special Discount for Club Members",
      content:
        "We’ve partnered with local businesses to offer exclusive discounts for our club members. Check out the offers in the attached document.",
      club_id: 103,
      member_id: 203,
      created_at: "2024-10-03 11:20:00",
      updated_at: "2024-10-03 11:20:00",
      date: "2024-10-05",
      time: "11:20:00",
      location: "Main Club Hall",
      ispin: false,
      img_url: "https://i.imgur.com/Q5l4LlZ.jpg",
    },
    {
      id: 4,
      title: "New Club Merchandise Available!",
      content:
        "Our new line of club merchandise is now available for purchase. Visit the club store to check it out!",
      club_id: 101,
      member_id: 204,
      created_at: "2024-09-30 16:40:00",
      updated_at: "2024-09-30 16:40:00",
      date: "2024-09-30",
      time: "16:40:00",
      location: "Main Club Building",
      ispin: false,
      img_url: "https://i.imgur.com/BmK5rZz.jpg",
    },
    {
      id: 5,
      title: "Upcoming Holiday Party",
      content:
        "Mark your calendars! Our annual holiday party will be held on December 20th. More details to follow.",
      club_id: 104,
      member_id: 205,
      created_at: "2024-10-08 09:10:00",
      updated_at: "2024-10-08 09:10:00",
      date: "2024-12-20",
      time: "09:10:00",
      location: "Conference Room A",
      ispin: true,
      img_url: "https://i.imgur.com/71msUgr.jpg",
    },
  ]);

  clubAnnouncement.sort((a, b) => {
    return b.ispin === a.ispin ? 0 : b.ispin ? 1 : -1;
  });

  clubPost.sort((a, b) => {
    return b.ispin === a.ispin ? 0 : b.ispin ? 1 : -1;
  });

  const sortByPin = (list) => {
    return list.sort((a, b) => b.ispin === a.ispin ? 0 : b.ispin ? 1 : -1);
  };

  const togglePin = (id, type) => {
    if (type === "post") {
      const updatedPosts = clubPost.map((post) =>
        post.id === id ? { ...post, ispin: !post.ispin } : post
      );
      setClubPost(sortByPin(updatedPosts));
    } else if (type === "announcement") {
      const updatedAnnouncements = clubAnnouncement.map((announcement) =>
        announcement.id === id ? { ...announcement, ispin: !announcement.ispin } : announcement
      );
      setClubAnnouncement(sortByPin(updatedAnnouncements));
    }
  };

  function getFormattedDate(dateTime) {
    const [date] = dateTime.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  function getFormattedTime(dateTime) {
    const [, time] = dateTime.split(" ");
    return time;
  }

  const triggerFunction = (e) => {
    const { id } = e.target;
    setActiveButton(id);

    if (e.target.id == "post" && toggleVisiblity == true) {
      setToggleVisible(!toggleVisiblity);
    } else if (e.target.id == "announcement" && toggleVisiblity == false) {
      setToggleVisible(!toggleVisiblity);
    }
  };


  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
    console.log(item);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  const { toggleLeft } = props;
  return (
    <div
      className={` ${
        toggleLeft ? "grid" : "hidden"
      } md:grid border-[1px] md:rounded-r-none p-4 md:h-[60vh] md:border-b-0`}
    >
      <h1 className="text-center text-lg md:text-2xl font-bold mb-4">
        Schedule and Announcements
      </h1>
      <div className="">
      <button
          onClick={triggerFunction}
          id="post"
          className={`${
          activeButton === "post" ? "bg-orange-600" : "bg-[#864E41]"
        } text-white px-3 md:px-10 m-auto py-1 md:py-2 rounded-lg text-base hover:bg-orange-600 mr-3 md:mr-8 ml-3 md:ml-4`}
      >
          View Post
        </button>
        <button
          onClick={triggerFunction}
          id="announcement"
          className={`${
            activeButton === "announcement" ? "bg-orange-600" : "bg-[#864E41]"
          } text-white px-3 md:px-10 m-auto py-1 md:py-2 rounded-lg text-base hover:bg-orange-600`}
        >
          View Announcement
        </button>
      </div>

      {(toggleVisiblity ? clubAnnouncement : clubPost).map((item) => (
        <div
          key={item.id}
          className="m-4 p-4 pt-0 md:p-6 border-solid border-[1px] rounded-lg h-max text-base"
        >
            <div className="relative">
            <button className="absolute top-2 right-2"
              onClick={() =>
                togglePin(item.id, toggleVisiblity ? "announcement" : "post")
              }
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className={`flex text-2xl ml-auto ${
                  item.ispin ? "text-orange-600" : "text-gray-400"
                }`}
              />
            </button>
            <div className="text-left mr-2 text-lg md:text-xl mt-3 font-semibold mb-4">
              {item.title}
            </div>
          </div>
          <div className="flex flex-col md:flex-row text-left md:w-3/5">
            {toggleVisiblity == false && (
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
          {toggleVisiblity == true && (
            <div className="mt-3 mb-3">
              <p>{item.location}</p>
              <p>{getFormattedDate(item.date)}</p>
              <p>{item.time}</p>
            </div>
          )}
          <div className="flex items-end w-max ml-auto">
            <button
              onClick={() => openModal(item)}
              className="bg-[#864E41] text-white px-3 md:px-8 m-auto py-1 md:py-2 rounded-lg text-base hover:bg-orange-600 mr-3 md:mr-8"
            >
              Edit
            </button>
            <button className="bg-[#EC5A51] text-white px-3 md:px-8 m-auto py-1 md:py-2 rounded-lg text-base hover:bg-orange-600">
              Delete
            </button>
          </div>
        </div>
      ))}

      <ClubHomePostEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={modalData}
      />
    </div>
  );
};
export default ClubHomePost;