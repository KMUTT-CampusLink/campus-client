import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/Upload_Popup";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup";
import { useNavigate } from "react-router-dom";
import {
  useCourseHeaderBySectionID,
  useAllAssignmentsBySectionID,
} from "../../services/queries";
import {
  useCreateAssignment,
  useEditAssignment,
  useDeleteAssignment,
} from "../../services/mutations";
import CourseHeader from "../../components/CourseHeader";
import AssignmentsList from "./TrTaskCard";

const TrTasks = () => {
  const sec_id = localStorage.getItem("sec_id");

  // Fetch course details and assignments
  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data:  assignments = [],isLoading,error} = useAllAssignmentsBySectionID(sec_id);
  console.log("Assignments:", assignments);

  // Mutations for CRUD operations
  const createAssignment = useCreateAssignment();
  const editAssignment = useEditAssignment();
  const deleteAssignment = useDeleteAssignment();

  const navigate = useNavigate();

  // State for popups
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  
  const toSubmissionTr = (assignment) =>
    navigate("/courses/Tr/tasks/submission", { state: { task: assignment } });

  // Open upload popup for new assignment
  const handleUploadClick = () => {
    setIsPopupOpen(true);
    setCurrentAssignment(null);
  };

  // Close upload popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Submit or edit an assignment
  const handleSubmitAssignment = (newAssignment) => {
    const { title, attachments } = newAssignment;

    if (currentAssignment) {
      // Edit existing assignment
      editAssignment.mutate({
        assignmentID: currentAssignment.id,
        body: {
          title,
          description: attachments[0], // Use the file name as description
        },
      });
    } else {
      // Create new assignment
      createAssignment.mutate({
        section_id: sec_id,
        title,
        description: attachments[0], // Use the file name as description
      });
    }
    setIsPopupOpen(false);
  };

  // Open delete confirmation popup
  const handleDeleteClick = (assignment) => {
    setAssignmentToDelete(assignment);
    setIsDeletePopupOpen(true);
  };

  // Delete assignment
  const handleDeleteAssignment = () => {
    deleteAssignment.mutate(assignmentToDelete.id);
    setIsDeletePopupOpen(false);
  };

  // Open edit popup
  const handleEditClick = (assignment) => {
    setCurrentAssignment(assignment);
    setIsPopupOpen(true);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"tasks"} />

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
          <div>File</div>
          <div>Actions</div>
        </div>
      </div>

<AssignmentsList
  sec_id={sec_id}
  toSubmissionTr={toSubmissionTr}
  handleEditClick={handleEditClick}
  handleDeleteClick={handleDeleteClick}
/>

      {isPopupOpen && (
        <UploadPopup
          onClose={handleClosePopup}
          onSubmit={handleSubmitAssignment}
          material={currentAssignment}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setIsDeletePopupOpen(false)}
          onDeleteAction={handleDeleteAssignment}
          message="Are you sure you want to delete this task?"
        />
      )}
    </div>
  );
};

export default TrTasks;