import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SectionUpdate from "./SectionUpdate";
import SectionDeletePopUp from "./SectionDeletePopUp";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const SectionCard = ({ section, employees }) => {
  const { name, day, start_time, end_time, room, id } = section;
  const navigate = useNavigate;
  const { code } = useParams();
  const [showDeletePopUp, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const handleDeleteClick = (id) => {
    setCurrentSectionId(id);
    setShowDelete(true);
  };
  const handleClosePopUp = () => {
    setShowDelete(false);
    setCurrentSectionId(null);
  };
  const handleUpdateClick = () => {
    setShowUpdate(true);
  };
  const handleClosePopUp2 = () => {
    setShowUpdate(false);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toTimeString().slice(0, 5); // Extract "HH:mm" part
  };

  const professor = employees?.[0];

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`employ/deleteSection/${code}/${id}`);
      setShowDelete(false);
      setCurrentSectionId(null);
      location.reload();
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  console.log(currentSectionId);
  return (
    <div className="border border-gray-300 rounded-lg p-5 mb-5 bg-white transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center font-geologica">
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-black">
            {name}
          </h2>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Professor:</strong>{" "}
            {professor
              ? `${professor.firstname} ${professor.lastname}`
              : "No professor assigned"}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Day:</strong> {day}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Time:</strong> {formatTime(start_time)} -{" "}
            {formatTime(end_time)}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Room:</strong> {room.name}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex justify-start md:justify-end gap-5">
          <div onClick={handleUpdateClick}>
            <FontAwesomeIcon
              className="hover:shadow-lg hover:text-[#D4A015] size-5 md:size-6"
              icon={faEdit}
            />
          </div>
          <div onClick={handleDeleteClick}>
            <FontAwesomeIcon
              className="hover:text-[#EC5A51] hover:shadow-lg size-5 md:size-6"
              icon={faTrash}
            />
          </div>
        </div>
      </div>

      {showDeletePopUp && (
        <SectionDeletePopUp
          //Delete pass ya oo mhr
          onClose={handleClosePopUp}
          a={handleDeleteConfirm}
        />
      )}

      {showUpdate && (
        <SectionUpdate
          //Update pass oo
          section={section}
          professor={professor} // Pass the entire section data to the update popup
          onClose={handleClosePopUp2}
        />
      )}
    </div>
  );
};

export default SectionCard;
