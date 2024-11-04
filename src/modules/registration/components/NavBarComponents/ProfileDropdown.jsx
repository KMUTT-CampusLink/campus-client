import { Link, useNavigate } from "react-router-dom";
import authConfig from "../../auth/authConfig";

const ProfileDropdown = ({ isProfileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authConfig.logout();  // Call the logout function to clear session and cookies
      navigate('/regis/login');  
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  if (!isProfileOpen) {
    return null;
  }

  return (
    <div className="absolute mt-4 right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition">
      <Link
        to="/"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Profile
      </Link>
      <Link
        to="/"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileDropdown;
