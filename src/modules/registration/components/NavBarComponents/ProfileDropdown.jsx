import { Link, useNavigate } from "react-router-dom";
import authConfig from "../../auth/authConfig";

const ProfileDropdown = ({ isProfileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authConfig.logout(); // Call the logout function to clear session and cookies
      navigate("/regis/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  if (!isProfileOpen) {
    return null;
  }

  return (
    <div className="absolute right-0 z-10 w-48 py-1 mt-4 transition origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
      <Link
        to="/regis/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Profile
      </Link>
      <Link
        to="/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileDropdown;
