import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Participant({
  examId,
  participants,
  fullMark,
  passMark,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[10px]">
      {participants.map((participant) => (
        <button
          key={participant.id}
          className="text-center w-[100%] text-[14px] flex rounded-lg py-[15px] gap-[10px] bg-gray-200 drop-shadow-sm hover:bg-gray-300"
          onClick={() => {
            navigate(
              `/exams/professor/scoring/${participant.id}/${participant.student_id}/${examId}`
            );
          }}
        >
          <p className="w-[20%]">{participant.student_id}</p>
          {/* <p className="w-[45%]">{participant.student_name}</p> */}
          <p className="w-[45%]">Nudhana Sarutipaisan</p>
          <p className="w-[10%]">{participant.total_score}</p>
          <p className="w-[10%]">{fullMark}</p>
          <p className="w-[15%]">
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
