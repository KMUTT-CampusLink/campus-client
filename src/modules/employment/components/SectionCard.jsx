import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SectionUpdate from "./SectionUpdate"
import SectionDeletePopUp from "./SectionDeletePopUp";

const SectionCard = ({ section }) => {
  const { firstname, midname, lastname, name, day, start_time, end_time, room_id } = section;

  const [showDeletePopUp, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleDeleteClick = () => {
    setShowDelete(true);
  };
  const handleClosePopUp = () => {
    setShowDelete(false);
  };
  const handleUpdateClick = () => {
    setShowUpdate(true);
  };
  const handleClosePopUp2 = () => {
    setShowUpdate(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 mb-5 bg-white transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center font-geologica">
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-black">{name}</h2>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Professor:</strong> {firstname} {midname} {lastname}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Day:</strong> {day}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Time:</strong> {start_time} - {end_time}
          </p>
          <p className="md:text-md text-sm text-gray-500">
            <strong>Room:</strong> {room_id}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex justify-start md:justify-end gap-5">
          <div onClick={handleUpdateClick}>
           <FontAwesomeIcon className="hover:shadow-lg hover:text-[#D4A015] size-5 md:size-6" icon={faEdit} />
          </div> 
          <div onClick={handleDeleteClick}> 
            <FontAwesomeIcon className="hover:text-[#EC5A51] hover:shadow-lg size-5 md:size-6" icon={faTrash} />
          </div>
          
          
        </div>
      </div>

      {showDeletePopUp && (
        <SectionDeletePopUp
          //Delete pass ya oo mhr
          onClose={handleClosePopUp}
        />
      )}

      {showUpdate && (
        <SectionUpdate
         //Update pass oo
          section={section} // Pass the entire section data to the update popup
          onClose={handleClosePopUp2}
        />
      )}
    </div>
  );
};

export default SectionCard;
