import React from "react";
import { useNavigate } from "react-router-dom";

const ClubCard = ({ clubName, imageSrc, clubId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the club's specific page when clicked
    const clubUrl = `/clubs/${clubId}`; //"Club takhu chin si khal yin lote ya nmhr"
    navigate(clubUrl); //Currently will send to club detail page br page pl nate"
  };

  return (
    <div
      className="card w-full shadow-xl bg-gray-50 cursor-pointer"
      onClick={handleClick}  // Add click event handler
    >
      <figure className="px-10 pt-10 flex justify-center items-center">
        <img src={imageSrc} alt={clubName} className="rounded-xl w-50 h-40" />
      </figure>
      <div className="card-body items-center text-center">
        <p>{clubName}</p>
      </div>
    </div>
  );
};

export default ClubCard;
