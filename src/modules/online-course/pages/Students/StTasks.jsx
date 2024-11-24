import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import CourseHeader from "../../components/CourseHeader";
import { useCourseHeaderBySectionIDForStudent, useAllAssignmentsBySectionID } from "../../services/queries";

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME
  }`;




const StTasks = () => {
  const { state } = useLocation();

  // Get sec_id from state or localStorage
  const [sec_id, setSec_id] = useState(() => {
    return state?.sec_id || localStorage.getItem("sec_id");
  });

  useEffect(() => {
    if (sec_id) {
      localStorage.setItem("sec_id", sec_id);
    }
  }, [sec_id]);

  // Fetch course details
  const { data: details } = useCourseHeaderBySectionIDForStudent(sec_id);

  // Fetch assignments
  const { data: assignments, isLoading, isError } = useAllAssignmentsBySectionID(sec_id);

  const handleSubmitAssignment = (newAssignment) => {
    const { attachments } = newAssignment;

    const formData = new FormData();
    formData.append("section_id", sec_id);
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

  // Sort assignments alphabetically by title
  const sortedAssignments = useMemo(() => {
    if (!assignments) return [];
    return [...assignments].sort((a, b) => a.title.localeCompare(b.title));
  }, [assignments]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <NavForIndvCourse page={"tasks"} />

      {/* Course Header */}
      <div className="max-md:pt-1 pt-12 pb-8 border-b-2 border-gray-300">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>

      {/* Page Title */}
      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ecb45e]">Tasks</div>
        </div>
      </div>

      {/* Task List Header */}
      <div className="w-full border-b-2 border-gray-300">
        <div className="max-md:w-full max-md:ml-1 w-3/4 mx-auto grid grid-cols-3 sm:grid-cols-4 gap-4 font-bold py-2 px-2">
          <div>Title</div>
          <div className="hidden sm:block">Start Date</div>
          <div>Due Date</div>
          <div>Submission</div>
        </div>
      </div>

      {/* Task List */}
      <div className="max-md:w-full w-3/4 max-md:px-4 max-lg:pr-8 mx-auto">
        {isLoading ? (
          <div>Loading tasks...</div>
        ) : isError ? (
          <div className="text-red-500">Error fetching tasks</div>
        ) : sortedAssignments.length === 0 ? (
          <div>No tasks available.</div>
        ) : (
          sortedAssignments.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4"
            >
              <div>
                <a
                  href={`${MINIO_BASE_URL}/${task.description}`}
                  download={`Assignment-${task.title}.pdf`}
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
                  onClick={() => console.log(task.id)}
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StTasks;
