import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faVideo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/Upload_Popup";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup";

const TrCourseMaterials = () => {
  const [materials, setMaterials] = useState([
    {
      title: "Lecture 1 - Introduction",
      date: "12/4/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)", "(2 hr 10 minutes)"], // Multiple recordings
    },
    {
      title: "Lecture 2 - Data Representation",
      date: "12/5/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)"],
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteContext, setDeleteContext] = useState(null);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [recordingIndex, setRecordingIndex] = useState(null);

  // Sort materials by title in ascending order
  const sortedMaterials = [...materials].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const handleUploadClick = () => {
    setIsPopupOpen(true);
    setCurrentMaterial(null);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitMaterial = (newMaterial) => {
    if (currentMaterial) {
      setMaterials((prevMaterials) =>
        prevMaterials.map((material) =>
          material === currentMaterial ? newMaterial : material
        )
      );
    } else {
      setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    }
    setIsPopupOpen(false);
  };

  const handleDeleteAttachmentClick = (material) => {
    setMaterialToDelete(material);
    setDeleteContext("attachment");
    setIsDeletePopupOpen(true);
  };

  const handleDeleteRecordingClick = (material, index) => {
    setMaterialToDelete(material);
    setRecordingIndex(index);
    setDeleteContext("recording");
    setIsDeletePopupOpen(true);
  };

  const handleDeleteAttachments = () => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material === materialToDelete
          ? { ...material, attachments: [], quantity: 0 }
          : material
      )
    );
    setIsDeletePopupOpen(false);
  };

  const handleDeleteRow = () => {
    setMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material !== materialToDelete)
    );
    setIsDeletePopupOpen(false);
  };

  const handleDeleteRecording = () => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material === materialToDelete
          ? {
              ...material,
              videos: material.videos.filter((_, i) => i !== recordingIndex),
            }
          : material
      )
    );
    setIsDeletePopupOpen(false);
  };

  const handleEditClick = (material) => {
    setCurrentMaterial(material);
    setIsPopupOpen(true);
  };

  return (
    <div className="max-md:text-xs w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"materials"} />

      <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
            About Classroom
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Course:</span> CSC-230 Computer
            Architecture & Design
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Lecturer:</span> Arjan
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Time:</span> 1:30 to 4:30 PM
            (Thursday)
          </div>
        </div>
      </div>

      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ecb45e]">MATERIALS</div>
          <button
            className="bg-[#ecb45e] text-white py-2 px-4 rounded hover:bg-[#d9a24b] transition duration-200"
            onClick={handleUploadClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="xl" />
            Upload
          </button>
        </div>
      </div>

      <div className="w-full border-b-2 border-gray-300">
        <div className="max-sm:text-sm max-md:w-full max-md:ml-1 w-3/4 mx-auto grid grid-cols-4 gap-4 font-bold py-2 px-2">
          <div>Title</div>
          <div>Date</div>
          <div>Attachments</div>
          <div>Recording</div>
        </div>
      </div>

      <div className="max-md:w-full w-3/4 max-md:px-4 max-lg:pr-8 mx-auto">
        {sortedMaterials.map((material, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 py-4">
            <div>{material.title}</div>
            <div>{material.date}</div>
            <div className="flex items-start gap-2 flex-col">
              <div>{material.attachments.join(", ")}</div>
              <div>{material.quantity} file(s)</div>
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(material)}>
                  <FontAwesomeIcon icon={faPenToSquare} color="red" />
                </button>
                <button onClick={() => handleDeleteAttachmentClick(material)}>
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {(material.videos || []).map((video, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faVideo} color="red" />
                  {video}
                  <button
                    onClick={() => handleDeleteRecordingClick(material, i)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <UploadPopup
          onClose={handleClosePopup}
          onSubmit={handleSubmitMaterial}
          material={currentMaterial}
          showVideos={true}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setIsDeletePopupOpen(false)}
          onDeleteAction={
            deleteContext === "attachment"
              ? [handleDeleteAttachments, handleDeleteRow]
              : [handleDeleteRecording, () => setIsDeletePopupOpen(false)]
          }
          message={
            deleteContext === "attachment"
              ? "Would you like to delete all attachments or the entire row?"
              : "Would you like to delete this recording?"
          }
          action1Label={
            deleteContext === "attachment"
              ? "Delete All Attachments"
              : "Delete Recording"
          }
          action2Label={
            deleteContext === "attachment" ? "Delete Entire Row" : "Cancel"
          }
          showAction2={deleteContext === "attachment"}
        />
      )}
    </div>
  );
};

export default TrCourseMaterials;
