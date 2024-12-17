import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import CourseHeader from "../../components/CourseHeader";
import {
  useCourseHeaderBySectionIDForStudent,
  useAllAssignmentsBySectionID,
} from "../../services/queries";
import {
  useEditAssignmentSubmission,
  useAddAssignmentSubmission,
} from "../../services/mutations";
import { FileUploadPopup } from "../../components/AssignmentSubmissionEditPopup";
import SubmissionRow from "../../components/SubmissionRow";

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}`;

const StTasks = () => {
  const { state } = useLocation();
  const [sec_id, setSec_id] = useState(() => state?.sec_id || localStorage.getItem("sec_id"));
  const [student_id, setStudentId] = useState(() => localStorage.getItem("studentId"));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { data: details } = useCourseHeaderBySectionIDForStudent(sec_id);
  const { data: assignments, isLoading, isError } = useAllAssignmentsBySectionID(sec_id);
  const editAssignmentSubmission = useEditAssignmentSubmission();
  const addAssignmentSubmission = useAddAssignmentSubmission();

  useEffect(() => {
    if (sec_id) localStorage.setItem("sec_id", sec_id);
    if (!student_id) console.error("Student ID is missing from local storage.");
  }, [sec_id, student_id]);

  const handleOpenPopup = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmitFile = (file) => {
    if (!selectedAssignment || !student_id) {
      alert("Missing assignment ID or student ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file_path", file);
    formData.append("student_id", student_id);
    formData.append("assignment_id", selectedAssignment);

    const submissionExists = assignments.find(
      (assignment) => assignment.id === selectedAssignment && assignment.submission_exists
    );

    if (submissionExists) {
      editAssignmentSubmission.mutate(
        { assignmentID: selectedAssignment, updatedSubmission: formData },
        {
          onSuccess: () => {
            alert("Submission updated successfully!");
            handleClosePopup();
          },
          onError: () => alert("Failed to update submission. Please try again."),
        }
      );
    } else {
      addAssignmentSubmission.mutate(
        { assignmentID: selectedAssignment, newSubmission: formData },
        {
          onSuccess: () => {
            alert("Submission added successfully!");
            handleClosePopup();
          },
          onError: () => alert("Failed to add submission. Please try again."),
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavForIndvCourse page={"tasks"} />
      <div className="pt-6 pb-4">
        {/* Course Header */}
        <div className="pt-12 pb-8">
          <CourseHeader
            c_code={details?.course_code}
            c_name={details?.course_name}
            c_lecturer={details?.lecturer}
            c_time={details?.time}
          />
        </div>

        {/* Tasks Table */}
        <div className="bg-white shadow-lg rounded-md mx-auto w-11/12 p-4">
          <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e] mb-3">
            Tasks
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-bold text-sm border-b pb-2">
            <div>Title</div>
            <div className="hidden sm:block">Due Date</div>
            <div className="hidden sm:block">Score</div>
            <div className="hidden sm:block">Feedback</div>
            <div className="text-center">Submission</div>
          </div>

          {/* Table Rows */}
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : isError ? (
            <div className="text-red-500">Error fetching tasks</div>
          ) : assignments?.length === 0 ? (
            <div>No tasks available.</div>
          ) : (
            assignments.map((task) => (
              <SubmissionRow
                key={task.id}
                task={task}
                MINIO_BASE_URL={MINIO_BASE_URL}
                handleOpenPopup={handleOpenPopup}
                sId={student_id}
              />
            ))
          )}
        </div>
      </div>

      {/* File Upload Popup */}
      {isPopupOpen && (
        <FileUploadPopup
          assignmentId={selectedAssignment}
          studentId={student_id}
          onSubmit={(file) => handleSubmitFile(file)}
          onClose={handleClosePopup}

        />
      )}
    </div>
  );
};

export default StTasks;
