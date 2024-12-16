import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  deleteExamById,
  checkHasParticiipant,
} from "../../../services/apis/professerApi";
import { useEffect, useState } from "react";

export default function ExamCard({ examName, examId, refresh, sectionId, status }) {
  const navigate = useNavigate();
  const [hasParticipant, setHasParticipant] = useState(false);
  const getCheckHasParticipant = async () => {
    try {
      const response = await checkHasParticiipant(examId);
      setHasParticipant(response.data.hasParticipant);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCheckHasParticipant();
  }, []);
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[10px] xl:p-[20px] ">
      <div>
        <div className="flex w-[100%] justify-between">
          <h4 className="text-[20px]">{examName}</h4>
          <button disabled={hasParticipant}>
            <FontAwesomeIcon
              icon={faTrash}
              className={`text-[20px] ${
                hasParticipant ? "text-gray-400" : "text-[#C3554E]"
              }`}
              onClick={() => {
                if (!hasParticipant) {
                  deleteExamById(examId);
                  refresh();
                }
              }}
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 xl:gap-4 pt-[12px]">
          <button
            className={`btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b] ${status === "history" || "approved" ? "hidden" : "block"}`}
            onClick={() => {
              navigate(`/exams/professor/edit/${examId}`);
            }}
          >
            Edit
          </button>
          <button
            className={`btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b] ${status === "history" ? "hidden" : "block"}`}
            onClick={() => {
              navigate(`/exams/professor/setting/${examId}`);
            }}
          >
            Setting
          </button>
          <button
            className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]"
            onClick={() => {
              navigate(
                `/exams/professor/overallScoring/${examId}/${sectionId}`
              );
            }}
          >
            Score
          </button>
          <button
            className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]"
            onClick={() => {
              navigate(`/exams/professor/dashboard/${examId}`);
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
