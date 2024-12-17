import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import CourseHeader from "../../components/CourseHeader";
import { useCourseHeaderBySectionIDForStudent, useAllAssignmentsBySectionID } from "../../services/queries";
import { useEditAssignmentSubmission, useAddAssignmentSubmission } from "../../services/mutations";
import { FileUploadPopup } from "../../components/AssignmentSubmissionEditPopup";

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}`;

const StTasks = () => {
  const { state } = useLocation();
  const [sec_id, setSec_id] = useState(() => state?.sec_id || localStorage.getItem("sec_id"));
  const [student_id, setStudentId] = useState(() => localStorage.getItem("studentId")); // Get student_id from local storage
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { data: details } = useCourseHeaderBySectionIDForStudent(sec_id);
  const { data: assignments, isLoading, isError } = useAllAssignmentsBySectionID(sec_id);
  const editAssignmentSubmission = useEditAssignmentSubmission();
  const addAssignmentSubmission = useAddAssignmentSubmission();

  useEffect(() => {
    if (sec_id) {
      localStorage.setItem("sec_id", sec_id);
    }
    if (!student_id) {
      console.error("Student ID is missing from local storage.");
    }
  }, [sec_id, student_id]);

  const handleOpenPopup = (assignmentId) => {
    console.log("Opening popup for assignment ID:", assignmentId);
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
      console.error("Selected Assignment:", selectedAssignment);
      console.error("Student ID:", student_id);
      return;
    }

    const formData = new FormData();
    formData.append("file_path", file); // Match key name with backend
    formData.append("student_id", student_id); // Add student_id to the payload
    formData.append("assignment_id", selectedAssignment); // Add assignment_id to the payload

    // Check if submission exists or needs to be added
    const submissionExists = assignments.find(
      (assignment) => assignment.id === selectedAssignment && assignment.submission_exists
    );

    if (submissionExists) {
      // Edit Submission Flow
      editAssignmentSubmission.mutate(
        { assignmentID: selectedAssignment, updatedSubmission: formData },
        {
          onSuccess: () => {
            alert("Submission updated successfully!");
            handleClosePopup();
          },
          onError: (error) => {
            console.error("Error updating submission:", error);
            alert("Failed to update submission. Please try again.");
          },
        }
      );
    } else {
      // Add Submission Flow
      addAssignmentSubmission.mutate(
        { assignmentID: selectedAssignment, newSubmission: formData },
        {
          onSuccess: () => {
            alert("Submission added successfully!");
            handleClosePopup();
          },
          onError: (error) => {
            console.error("Error adding submission:", error);
            alert("Failed to add submission. Please try again.");
          },
        }
      );
    }
  };


  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <NavForIndvCourse page={"tasks"} />

      <div className="max-md:pt-1 pt-6 pb-4">
        {/* Course Header */}
        <div className="max-md:pt-1 pt-12 pb-8">
          <CourseHeader
            c_code={details?.course_code}
            c_name={details?.course_name}
            c_lecturer={details?.lecturer}
            c_time={details?.time}
          />
        </div>

        <div className="max-sm:text-sm max-md:pt-2 pt-6 pb-8 mb-3 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:px-4">
          <div className="max-md:w-full w-3/4 mx-auto">
            <div className="text-2xl font-extrabold pb-3 text-[#ecb45e] border-b-2 border-[#ecb45e] mb-3">
              Tasks
            </div>
          </div>

          <div className="w-full">
            <div className="max-md:w-full w-3/4 mx-auto grid grid-cols-3 sm:grid-cols-4 gap-4 font-bold py-2 px-2">
              <div>Title</div>
              <div className="hidden sm:block">Publish Date</div>
              <div>Due Date</div>
              <div>Submission</div>
            </div>
          </div>

          <div className="max-md:w-full w-3/4 mx-auto border-b-1 border-gray-300">
            {isLoading ? (
              <div>Loading tasks...</div>
            ) : isError ? (
              <div className="text-red-500">Error fetching tasks</div>
            ) : assignments?.length === 0 ? (
              <div>No tasks available.</div>
            ) : (
              assignments.map((task) => (
                <div key={task.id} className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4">
                  <div>
                    <a
                      href={`${MINIO_BASE_URL}/${task.description}`}
                      download
                      className="text-blue-500 underline"
                    >
                      {task.title}
                    </a>
                  </div>
                  <div className="hidden sm:block">
                    {task.start_date ? new Date(task.start_date).toLocaleDateString() : "N/A"}
                  </div>
                  <div>
                    {task.end_date ? new Date(task.end_date).toLocaleDateString() : "N/A"}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <button
                      className="flex sm:text-[18px] text-[14px] gap-4 w-[95%] items-center justify-center rounded-lg shadow-lg p-1 bg-[#FFFFFF]"
                      onClick={() => handleOpenPopup(task.id)}
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <FileUploadPopup
          assignmentId={selectedAssignment}
          studentId={student_id}
          onSubmit={(file) => handleSubmitFile(file)} // Pass file submission function
          onClose={handleClosePopup}
        />

      )}
    </div>
  );
};

export default StTasks;
