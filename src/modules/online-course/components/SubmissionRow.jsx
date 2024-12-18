import React, { useEffect } from "react";
import { useAssignmentSubmissionFilePath } from "../services/queries";

const SubmissionRow = ({ task, MINIO_BASE_URL, handleOpenPopup, sId }) => {
    const studentId = sId;
    const { data: student, isLoading, isError } = useAssignmentSubmissionFilePath(task.id, studentId);

    console.log("student", student);

    return (
        <div
            key={task.id}
            className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center text-sm py-3 border-b"
        >
            {/* Title */}
            <div>
                <a
                    href={`${MINIO_BASE_URL}/${task.description}`}
                    download
                    className="text-blue-500 underline hover:text-blue-600"
                >
                    {task.title}
                </a>
            </div>

            {/* Due Time and Date */}
            <div className="hidden sm:block">
                {task.end_date
                    ? (() => {
                        const dateObj = new Date(task.end_date);
                        const time = dateObj.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        });
                        const date = dateObj.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        });
                        return `${time} - ${date}`;
                    })()
                    : "N/A"}
            </div>

            {/* Score */}
            <div className="hidden sm:block">
                {isLoading
                    ? "Loading..."
                    : isError
                        ? "Error"
                        : student?.data?.score
                            ? `${student?.data?.score}/10`
                            : "Not graded"}
            </div>

            {/* Feedback */}
            <div className="hidden sm:block relative group">
                <div
                    className="truncate w-full max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
                    style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    title={student?.data?.feedback || "No feedback"}
                >
                    {isLoading
                        ? "Loading..."
                        : isError
                            ? "Error"
                            : student?.data?.feedback
                                ? student?.data?.feedback
                                : "No feedback"}
                </div>
                {/* Tooltip */}
                {student?.data?.feedback && (
                    <span className="absolute bottom-0 left-0 shadow-lg bg-white text-black text-xs rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {student?.data?.feedback}
                    </span>
                )}
            </div>

            {/* Action */}
            <div className="text-center">
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handleOpenPopup(task.id)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SubmissionRow;
