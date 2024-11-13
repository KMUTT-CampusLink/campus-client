import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Participant({
  examId,
  participants,
  fullMark,
  passMark,
}) {
  const navigate = useNavigate();
  console.log(participants);
  return (
    <div className="flex flex-col gap-[10px]">
      {participants.map((participant) => (
        <button
          key={participant.id}
          className="text-center w-[100%] text-[14px] flex rounded-lg py-[15px] gap-[10px] bg-white drop-shadow-md hover:bg-gray-50"
          onClick={() => {
            navigate(
              `/exams/professor/scoring/${participant.id}/${participant.student_id}/${examId}`
            );
          }}
        >
          <p className="w-[20%]">{participant.student_id}</p>
          <p className="w-[45%]">{participant.firstname} {participant.lastname}</p>
          <p className="w-[10%]">{participant.total_score}</p>
          <p className="w-[10%]">{fullMark}</p>
          <p
            className={`w-[15%] ${
              !participant.is_checked
                ? "text-yellow-500"
                : participant.total_score >= passMark
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {!participant.is_checked
              ? "processing"
              : participant.total_score >= passMark
              ? "passed"
              : "failed"}
          </p>
        </button>
      ))}
    </div>
  );
}
