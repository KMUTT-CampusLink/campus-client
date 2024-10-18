import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faEnvelope,
  faHome,
  faEdit,
} from "@fortawesome/free-solid-svg-icons"; // Importing necessary icons

function Header( {userRole} ) {
  const notificationLink = 
    userRole === "admin"
      ? "/clubs/admin/admin-noti" : "/clubs/member/notifications";
  const location = useLocation();

  const pageTitle = (() => {
    switch (location.pathname) {
      case "/profile":
        return { icon: faUser, title: "Profile (Mhar twr tl)" };
      case "/clubs/admin/create-post":
        return { icon: faUser, title: "Create Post" };
      case "/clubs/admin/club-create":
          return { icon: faUser, title: "Create Club" };
      case "/clubs/admin/create-announcement":
        return { icon: faEnvelope, title: "Make Announcement" };
      case "/clubs/view-requests":
        return { icon: faEnvelope, title: "View Requests" };
      case "/clubs/notifications":
        return { icon: faBell, title: "Notifications" };
      case "/clubs/member":
        return { icon: faUser, title: "Member Profile" };
      default:
        return { icon: faHome, title: "Clubs" };
    }
  })();

  // Destructure icon and title from the pageTitle object
  const { icon, title } = pageTitle;

  return (
    <div className="h-20 bg-white-200 flex justify-between items-center p-4 pr-10 border-b rounded-t-lg">
      {/* Dynamic Page Title on the left with Icon */}
      <div className="ml-10 flex items-center space-x-7 text-xl font-bold">
        <Link to="/clubs"> {/* Navigate to the Clubs or homepage when clicking the icon */}
          <FontAwesomeIcon icon={icon} size="2x" className="text-gray-600 cursor-pointer" />
        </Link>
        <span><h1 style={{ fontSize: '30px' }}>{pageTitle.title}</h1></span>
      </div>
      
      {/* Notifications Button on the right */}
      <div>
        <Link to= { notificationLink }>
          <button className="text-gray-600">
            <FontAwesomeIcon icon={faBell} size = "2x"/>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;