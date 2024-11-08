import { useState, useRef, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";

const ProfileButton = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="relative flex-shrink-0 mr-2" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen((prev) => !prev)}
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <img
          alt="Profile"
          src="/logos/profile-pic.png"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>
      <ProfileDropdown isProfileOpen={isProfileOpen} />
    </div>
  );
};

export default ProfileButton;
