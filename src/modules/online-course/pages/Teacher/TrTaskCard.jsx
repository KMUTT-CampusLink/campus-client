import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const AssignmentsList = ({
  assignments = [],
  toSubmissionTr,
  handleEditClick,
  handleDeleteClick,
  isLoading,
  error,
}) => {
  const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${
  import.meta.env.VITE_MINIO_BUCKET_NAME
}`;
  return (
    <div className="max-md:text-xs max-md:w-full w-3/4 max-md:px-4 max-lg:pr-8 mx-auto">
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : error ? (
        <p className="text-red-500">
          {error.message || "An error occurred while loading tasks."}
        </p>
      ) : assignments.length === 0 ? (
        <p>No assignments available</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.id} className="grid grid-cols-3 gap-4 py-4">
            <div
              onClick={() => toSubmissionTr(assignment)}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {assignment.title}
            </div>
            <div>
              {assignment.description ? (

                <a
                href={`${MINIO_BASE_URL}/${assignment.description}`}
                  download={`Assignment-${assignment.title}.pdf`}
                  className="text-blue-500 underline"
                >
                  View/Download File
                </a>
              ) : (
                "No file attached"
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(assignment)}
                className="hover:scale-110 transition"
                title="Edit Assignment"
              >
                <FontAwesomeIcon icon={faPenToSquare} color="blue" />
              </button>
              <button
                onClick={() => handleDeleteClick(assignment)}
                className="hover:scale-110 transition"
                title="Delete Assignment"
              >
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AssignmentsList;
