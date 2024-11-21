import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAllAssignmentsBySectionID } from "../../services/queries";

const AssignmentsList = ({ sec_id, toSubmissionTr, handleEditClick, handleDeleteClick }) => {
  const { data: assignments , isLoading, error } = useAllAssignmentsBySectionID(sec_id);
  const [hasData, setHasData] = useState(false);

  // Update hasData state based on assignments availability
  useEffect(() => {
    setHasData(assignments?.length > 0); // Simplified conditional
  }, [assignments]);

  return (
    <div className="max-md:text-xs max-md:w-full w-3/4 max-md:px-4 max-lg:pr-8 mx-auto">
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">Error loading tasks: {error.message}</p>
      ) : !hasData ? (
        <p>No assignments available</p>
      ) : (
        assignments?.map((assignment) => (
          <div key={assignment.id} className="grid grid-cols-3 gap-4 py-4">
            <div onClick={() => toSubmissionTr(assignment)} className="cursor-pointer text-blue-500 hover:underline">
              {assignment.title}
            </div>
            <div>{assignment.description || "No description provided"}</div>
            <div className="flex gap-2">
              <button onClick={() => handleEditClick(assignment)} className="hover:scale-110 transition">
                <FontAwesomeIcon icon={faPenToSquare} color="blue" />
              </button>
              <button onClick={() => handleDeleteClick(assignment)} className="hover:scale-110 transition">
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
