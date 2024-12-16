import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/Upload_Popup"; // Fixed import
import { useNavigate } from "react-router-dom";
import { useCourseHeaderBySectionID, useAllAssignmentsBySectionID } from "../../services/queries";
import { useCreateAssignment, useDeleteAssignment } from "../../services/mutations";
import CourseHeader from "../../components/CourseHeader";
import AssignmentsList from "./TrTaskCard";

const TrTasks = () => {

  const sec_id = localStorage.getItem("sec_id");

  // Fetch course details and assignments
  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: assignments = [], isLoading, error } = useAllAssignmentsBySectionID(sec_id);

  // Mutations
  const createAssignmentMutation = useCreateAssignment();
  const deleteAssignment = useDeleteAssignment();

  const navigate = useNavigate();

  // State for popups
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  const toSubmissionTr = (assignment) =>
    navigate("/courses/Tr/tasks/submission", { state: { task: assignment } });

  // Add a function to handle delete
  const handleDeleteClick = (assignment) => {
    deleteAssignment.mutate(assignment.id, {
      onSuccess: () => {
        console.log("Assignment deleted successfully!");
      },
      onError: (error) => {
        console.error("Error deleting assignment:", error);
      },
    });
  };


  // Open upload popup for new assignment
  const handleUploadClick = () => {
    setIsPopupOpen(true);
    setCurrentAssignment(null);
  };

  // Close upload popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Submit a new assignment
  const handleSubmitAssignment = (newAssignment) => {
    const { title, attachments } = newAssignment;

    const formData = new FormData();
    formData.append("section_id", sec_id);
    formData.append("title", title);
    formData.append("description", attachments[0]); // Attach the file

    createAssignmentMutation.mutate(formData, {
      onSuccess: () => {
        console.log("Assignment created successfully!");
        setIsPopupOpen(false);
      },
      onError: (error) => {
        console.error("Error creating assignment:", error);
      },
    });
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
      <NavForIndvCourse page={"tasks"} />

      <div className="py-8">

        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>

      <div className="py-8 max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx">
        <div className="py-8 w-full">
          <div className="w-3/4 mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-[#ecb45e]">TASKS</div>
            <button
              className="bg-[#ecb45e] text-white py-2 px-4 rounded hover:bg-[#d9a24b] transition duration-200"
              onClick={handleUploadClick}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Upload
            </button>
          </div>
        </div>

        <AssignmentsList
          assignments={assignments} // Pass fetched assignments
          toSubmissionTr={toSubmissionTr}
          handleEditClick={() => { }}
          handleDeleteClick={handleDeleteClick}
          isLoading={isLoading} // Pass loading state
          error={error} // Pass error state
        />


        {isPopupOpen && (
          <UploadPopup
            onClose={handleClosePopup}
            onSubmit={handleSubmitAssignment}
          />
        )}
      </div>
    </div>


  );
};

export default TrTasks;
