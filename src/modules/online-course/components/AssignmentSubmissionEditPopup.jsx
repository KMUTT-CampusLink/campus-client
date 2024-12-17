import React, { useState, useEffect } from "react";
import { useAssignmentSubmissionFilePath } from "../services/queries";
import { useAddAssignmentSubmission } from "../services/mutations";

export const FileUploadPopup = ({ assignmentId, studentId, onClose }) => {
  const [file, setFile] = useState(null);
  const [isSubmissionAvailable, setIsSubmissionAvailable] = useState(false);
  const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}`;

  // Fetch existing assignment submission file path
  const { data: submissionFilePath, isLoading, isError } = useAssignmentSubmissionFilePath(assignmentId, studentId);

  const addAssignmentSubmission = useAddAssignmentSubmission();

  useEffect(() => {
    // Check if submission exists
    if (submissionFilePath?.data?.file_path) {
      setIsSubmissionAvailable(true);
    } else {
      setIsSubmissionAvailable(false);
    }
  }, [submissionFilePath]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    console.log("Student ID:", studentId);
    console.log("Assignment ID:", assignmentId);

    const formData = new FormData();
    formData.append("file_path", file);
    formData.append("student_id", studentId);
    formData.append("assignment_id", assignmentId);

    console.log("Submitting assignment:", formData);

    addAssignmentSubmission.mutate(formData, {
      onSuccess: () => {
        alert("Assignment submitted successfully!");
        console.log("Assignment submitted successfully!", formData);
        onClose();
      },
      onError: (error) => {
        console.error("Error submitting assignment:", error);
        alert("Failed to submit assignment. Please try again.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Submit Assignment</h2>

        {isLoading ? (
          <div className="text-center">Loading submission status...</div>
        ) : isError ? (
          <div className="text-red-500 text-center">Error fetching submission status.</div>
        ) : isSubmissionAvailable && (
          <div className="text-center">
            <p className="text-green-500 mb-4">You have already submitted this assignment.</p>
            <a
              href={`${MINIO_BASE_URL}/${submissionFilePath.file_path}`}
              download={`Assignment-${assignmentId}.pdf`}
              className="text-blue-500 underline"
            >
              View Submitted File
            </a>
          </div>
        )}

        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            accept=".pdf,.doc,.docx,.txt"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
