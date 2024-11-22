import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams, Link } from "react-router-dom";

function ClubDetailCard({ isAdmin, isMember }) {
  const [clubName, setClubName] = useState("");
  const [buildiingLocation, setBuildingLocation] = useState("");
  const { clubId } = useParams(); // club ID from the backend
  const [memberCount, setMemberCount] = useState(0);
  const [clubImg, setClubImg] = useState("");

  useEffect(() => {
    const fetchClubName = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/${clubId}`);
        const clubData = response.data.data;
        setClubName(clubData.name);
        setBuildingLocation(
          clubData.building ? clubData.building.name : "Not located!"
        );
        const members = clubData.club_member.filter(
          (member) => member.status === "Accepted"
        );
        setMemberCount(members.length - 1);
        setClubImg(
          `${
            import.meta.env.VITE_MINIO_URL +
            import.meta.env.VITE_MINIO_BUCKET_NAME
          }/${clubData.club_img}`
        );
      } catch (err) {
        console.error("Error fetching club details:", err);
      }
    };
    fetchClubName();
  }, [clubId]);

  const handleJoinRequest = async () => {
    try {
      const response = await axiosInstance.post(
        `/clubs/${clubId}/join-request`
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending join request:", err);
      alert(
        "Failed to send join request. Already a member or pending request!"
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:mb-8">
      <div>
        <img
          src={clubImg}
          className=" w-[90%] md:w-[70%] h-auto m-auto rounded-xl"
          alt={clubName}
        />
      </div>

      <div className="grid m-[10%] md:m-auto justify-content-start font-semibold text-[1rem] md:text-[2rem] gap-x-20">
        <h2 className="text-xl font-semibold text-gray-800">{clubName}</h2>
        {/* <h2 className="text-xl font-semibold text-gray-800"> Group Admin - {adminCount}</h2> */}
        <h2 className="text-xl font-semibold text-gray-800">
          Group Member: {memberCount > 0 ? memberCount : "No members yet!"}
        </h2>
        <h2 className="text-xl font-semibold text-gray-800">
          Location: {buildiingLocation}{" "}
        </h2>
        {!isAdmin && !isMember && (
          <button
            onClick={handleJoinRequest}
            className="flex md:grid m-auto mt-3 md:mt-8 text-center p-3 rounded-lg text-s md:text-xl text-white"
            style={{ backgroundColor: "#F69800" }}
          >
            Join Club Now!
          </button>
        )}
      </div>
    </div>
  );
}

export default ClubDetailCard;