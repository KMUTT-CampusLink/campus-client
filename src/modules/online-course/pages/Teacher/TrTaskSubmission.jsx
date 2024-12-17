import React, { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import FeedbackPopup from "../../components/FeedbackPopup";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faDownload } from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import { useCourseHeaderBySectionID, useStudentSubmission } from "../../services/queries";
import { useFeedbackSubmission } from "../../services/mutations"; // Import your mutation hook

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}`;

const TrTaskSubmission = () => {
  const sec_id = localStorage.getItem("sec_id");
  const location = useLocation();
  const { task } = location.state || {};

  const [isFeedbackOpen, setFeedbackOpen] = useState(false); // Modal visibility state
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for feedback

  const submitFeedback = useFeedbackSubmission();

  const { data: details, isLoading: isHeaderLoading, error: headerError } = useCourseHeaderBySectionID(sec_id);
  const { data: submittedStudents, isLoading: isStudentsLoading, error: studentsError, refetch } = useStudentSubmission(sec_id, task?.id); // Add refetch here

  const getStatusColor = (createdAt) => {
    if (createdAt == null) return "red";
    const deadline = new Date(task?.end_date);
    const submissionDate = new Date(createdAt);
    return submissionDate <= deadline ? "#6ae65f" : "#e5d35b";
  };

  const handleOpenFeedback = (student) => {
    setSelectedStudent(student);
    setFeedbackOpen(true); // Open popup
  };

  const handleCloseFeedback = () => {
    setFeedbackOpen(false); // Close popup
    setSelectedStudent(null);
  };

  const handleSubmitFeedback = async (feedbackData) => {
    // Prepare feedback data
    const feedback = {
      submissionId: selectedStudent?.id,
      score: feedbackData.decimalValue,
      feedback: feedbackData.textValue,
    };

    // Call the mutation to submit feedback
    submitFeedback.mutate(feedback, {
      onSuccess: () => {
        console.log("Feedback successfully submitted!");
        // Refetch the student submissions after successful feedback submission
        refetch();
      },
      onError: (error) => {
        console.error("Error submitting feedback:", error);
      },
    });
  };

  if (!task?.id) {
    return <div className="text-red-500">Task ID is missing.</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"tasks"} />

      {isHeaderLoading ? (
        <div>Loading course details...</div>
      ) : headerError ? (
        <div>Error loading course details: {headerError.message}</div>
      ) : (
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      )}

      {/* Task Title */}
      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:ml-4 w-3/4 mx-auto">
          <div className="text-xl md:text-2xl font-semibold text-[#ecb45e]">TASKS</div>
          <div className="text-lg md:text-lg my-2">{task?.title || "Untitled Task"}</div>
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="#66b052" />
              <span className="text-sm md:text-base font-medium">On Time</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="#e5d35b" />
              <span className="text-sm md:text-base font-medium">Late</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSquare} color="red" />
              <span className="text-sm md:text-base font-medium">Absent</span>
            </div>
          </div>
        </div>
      </div>


      <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx">
        <div className="max-md:w-full max-md:ml-2 mx-auto p-4">
          {/* Row Title */}
          <div className="max-md:text-sm max-sm:text-xs text-lg font-bold grid max-md:grid-cols-5 grid-cols-6 justify-items-center border-b-2 border-b-gray-300">
            <div className="max-md:hidden">Student name</div>
            <div>Student ID</div>
            <div>File Upload</div>
            <div>Status</div>
            <div>Score</div>
            <div></div>
          </div>

          {/* Submission Table */}
          {submittedStudents?.data?.length > 0 ? (
            submittedStudents?.data?.map((student) => (
              <div
                key={student.student_id}
                className="max-md:pl-3 max-md:text-sm max-sm:text-xs grid max-md:grid-cols-5 max-md:gap-5 justify-items-center grid-cols-6 justify-center pt-2 pb-2"
              >
                <div className="max-md:hidden justify-self-start">
                  <div className="max-lg:pl-1 lg:pl-14">{student.name}</div>
                </div>
                <div>{student.student_id}</div>
                <div className="text-[#ecb45e] lg:max-w-[16rem] max-md:max-w-12">
                  <a
                    href={`${MINIO_BASE_URL}/${student.file_path}`}
                    download
                    className="text-red-500 underline"
                    onClick={(e) => {
                      if (!student.file_path) {
                        e.preventDefault();
                        alert("File not available!");
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="pl-2 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-red-600"
                    />
                  </a>
                </div>
                <div>
                  <FontAwesomeIcon icon={faSquare} color={getStatusColor(student.create_at)} />
                </div>
                <div>{student.score !== null ? `${student.score}/10` : "N/A"}</div>
                <button
                  className="bg-[#ecb45e] text-white py-0.5 px-3 rounded hover:bg-[#d9a24b] transition duration-200"
                  onClick={() => handleOpenFeedback(student)}
                >
                  Feedback
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4">No submissions found for this task.</div>
          )}
        </div>
      </div>


      {/* Feedback Popup */}
      {isFeedbackOpen && (
        <FeedbackPopup
          isOpen={isFeedbackOpen}
          onClose={handleCloseFeedback}
          onSubmit={handleSubmitFeedback}
          studentName={selectedStudent?.name || ""}
        />
      )}
    </div>
  );
};

export default TrTaskSubmission;
