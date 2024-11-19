import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/Upload_Popup";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup";
import { useNavigate, useLocation } from "react-router-dom";
import { useCourseHeaderBySectionID } from "../../services/queries";
import CourseHeader from "../../components/CourseHeader";


const TrTasks = () => { 

  const sec_id = localStorage.getItem("sec_id");
  const { data: details } =
    useCourseHeaderBySectionID(sec_id);

  const navigate = useNavigate();

  const toSubmissionTr = (task) => navigate("/courses/Tr/tasks/submission", {state: {task}})



  const [materials, setMaterials] = useState([
    {
      title: "Exercise 1.1",
      date: "12/4/2024",
      attachments: ["HW1-Individual-Complement"],
    },
    {
      title: "Exercise 1.2(Individual)",
      date: "12/5/2024",
      attachments: ["HW2-Individual-2nd Complement"],
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);

  // Sorting materials by title in ascending order
  const sortedMaterials = [...materials].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Open the Upload popup for new material
  const handleUploadClick = () => {
    setIsPopupOpen(true);
    setCurrentMaterial(null);
  };

  // Close the Upload popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Submit or update a material
  const handleSubmitMaterial = (newMaterial) => {
    if (currentMaterial) {
      // Update the existing material in the list
      setMaterials((prevMaterials) =>
        prevMaterials.map((material) =>
          material === currentMaterial ? newMaterial : material
        )
      );
    } else {
      // Add new material
      setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    }
    setIsPopupOpen(false);
  };

  // Open the delete confirmation popup for attachments
  const handleDeleteAttachmentClick = (material, file) => {
    setMaterialToDelete(material);
    setFileToDelete(file);
    setIsDeletePopupOpen(true);
  };

  // Handle deleting the selected file
  const handleDeleteFile = () => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material === materialToDelete
          ? {
              ...material,
              attachments: material.attachments.filter(
                (file) => file !== fileToDelete
              ),
            }
          : material
      )
    );
    setIsDeletePopupOpen(false);
  };

  // Handle deleting the entire row
  const handleDeleteRow = () => {
    setMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material !== materialToDelete)
    );
    setIsDeletePopupOpen(false);
  };

  // Handle Edit Button Click
  const handleEditClick = (material) => {
    setCurrentMaterial(material);
    setIsPopupOpen(true);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"tasks"} />

      {/* <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
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
      </div> */}
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ecb45e]">TASKS</div>
          <button
            className="bg-[#ecb45e] text-white py-2 px-4 rounded hover:bg-[#d9a24b] transition duration-200"
            onClick={handleUploadClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="xl" />
            Upload
          </button>
        </div>
      </div>

      <div className="max-md:text-xs w-full border-b-2 border-gray-300">
        <div className="max-md:w-full max-md:ml-1 w-3/4 mx-auto grid grid-cols-3 gap-4 font-bold py-2 px-2">
          <div>Title</div>
          <div>Attachments</div>
          <div>Publish Date</div>
        </div>
      </div>

      <div className="max-md:text-xs max-md:w-full w-3/4 max-md:px-4 max-lg:pr-8 mx-auto">
        {sortedMaterials.map((material, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 py-4">
            <div onClick={() => toSubmissionTr(material)}>{material.title}</div>
            <div className="flex items-start gap-2 flex-col">
              <div>{material.attachments.join(", ")}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(material)}>
                  <FontAwesomeIcon icon={faPenToSquare} color="red" />
                </button>
                {material.attachments.map((file, i) => (
                  <button
                    key={i}
                    onClick={() => handleDeleteAttachmentClick(material, file)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" />
                  </button>
                ))}
              </div>
            </div>
            <div>{material.date}</div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <UploadPopup
          onClose={handleClosePopup}
          onSubmit={handleSubmitMaterial}
          material={currentMaterial}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setIsDeletePopupOpen(false)}
          onDeleteAction={[handleDeleteFile, handleDeleteRow]}
          message="Would you like to delete the file or the entire task?"
          action1Label="Delete File"
          action2Label="Delete Entire Task"
          showAction2={true}
        />
      )}
    </div>
  );
};

export default TrTasks;
