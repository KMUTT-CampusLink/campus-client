import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function HeadLineCard({ profilePic, link, title }) {
  const hasProfilePic = profilePic && profilePic !== ""; // Check if profilePic exists and is valid

  return (
    <div className="flex flex-start items-center bg-white p-4 shadow-md rounded-md">
      {hasProfilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10 mr-4 rounded-full"
        />
      ) : (
        <FontAwesomeIcon
          icon={faCircleUser}
          className="text-black w-20 h-20 mr-4"
          aria-label="Default profile icon"
        />
      )}
      <div>
        <h1 className="text-2xl font-geologica font-bold">{title}</h1>
        {link ? ( // Check if link is valid before rendering
          <Link
            to={link}
            className="text-sm text-[#DC5A52] font-georama underline underline-offset-auto font-light"
          >
            Detailed Information
          </Link>
        ) : null}
      </div>
    </div>
  );
}

// Define prop types
HeadLineCard.propTypes = {
  profilePic: PropTypes.string, // Make profilePic optional
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeadLineCard;