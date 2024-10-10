import { Link } from "react-router-dom";
// import profilePic from "../avatar.jpg"; // Replace with actual image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
function HeadLineCard({ link, title }) {
  // const hasProfilePic = profilePic !== ""; // Check if profilePic exists or is valid
  const hasProfilePic = false;

  return (
    <>
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
          />
        )}
        <div>
          <h1 className="text-2xl font-geologica font-bold">{title}</h1>
          <Link
            to={link}
            className="text-sm text-[#DC5A52] font-georama underline underline-offset-auto font-light"
          >
            Detailed Information
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeadLineCard;
