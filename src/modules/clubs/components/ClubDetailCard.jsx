import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, Link } from "react-router-dom";
import { set } from "react-hook-form";


function ClubDetailCard() {
  const [clubName, setClubName] = useState("");
  const [buildiingLocation, setBuildingLocation] = useState("");
  const { clubId } = useParams(); // club ID from the backend
  const [member, setMenber] = useState();
  useEffect(() => {
    const fetchClubName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/clubs/${clubId}`);
        setClubName(response.data.data.name);
        setBuildingLocation(response.data.data.building.name);
        setMenber(response.data.data._count.club_member);
      } catch (err) {
        console.error("Error fetching club details:", err);
      }
    };
    fetchClubName();
  },[clubId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:mb-8">
      <div>
        <img
          src="https://i.imgur.com/iPUUzwh.jpg"
          className=" w-[90%] md:w-[70%] h-auto m-auto rounded-xl"
          alt={clubName}
        />
      </div>

      <div className="grid m-[10%] md:m-auto justify-content-start font-semibold text-[1rem] md:text-[2rem] gap-x-20">
        <h2 className="text-xl font-semibold text-gray-800">{clubName}</h2>
        <h2 className="text-xl font-semibold text-gray-800"> Group Admin - 5</h2>
        <h2 className="text-xl font-semibold text-gray-800">Group Member: {member? member: "No members yet!"}</h2>
        <h2 className="text-xl font-semibold text-gray-800">Location: {buildiingLocation? buildiingLocation : "Not located!"} </h2>
        <Link to="/clubs/join-club">
          <button
            className="flex md:grid m-auto mt-3 md:mt-8 text-center p-3 md:p-3 w-max md:w-full rounded-2xl text-s md:text-xl shadow-lg text-white"
            style={{ backgroundColor: "#F69800" }}
          >
            Join Club Now!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ClubDetailCard;
