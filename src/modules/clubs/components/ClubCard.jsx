import React from "react";
import { useNavigate } from "react-router-dom";

const ClubCard = ({ clubName, imageSrc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the club's specific page when clicked
    //-->>const clubUrl = `/clubs/${clubName.toLowerCase().replace(/\s+/g, '-')}`; "Club takhu chin si khal yin lote ya nmhr"
    navigate("/clubs/club-detail"); //Currently will send to club detail page br page pl nate"
  };

  return (
    <div
      className="card w-full shadow-xl bg-gray-50 cursor-pointer"
      onClick={handleClick}  // Add click event handler
    >
      <figure className="px-10 pt-10">
        <img src={imageSrc} alt={clubName} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <p>{clubName}</p>
      </div>
    </div>
  );
};

export default ClubCard;
