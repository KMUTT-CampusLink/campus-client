import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";

function HeadLineCard({ link, title, subText = "Detailed Information" }) {
  const profilePic = "/logos/profile-pic.png";

  return (
    <div className="flex items-center p-4 bg-white rounded-md shadow-md flex-start">
      <img
        src={profilePic}
        alt="Profile"
        className="w-20 h-20 mr-4 rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold font-geologica">{title}</h1>
        {link ? ( // Check if link is valid before rendering
          <Link
            to={link}
            className="text-sm text-[#DC5A52] font-georama underline underline-offset-auto font-light"
          >
            {subText}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

// Define prop types
HeadLineCard.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
};

export default HeadLineCard;
