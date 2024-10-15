import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ExamCard({ examName }) {
  const navigate = useNavigate();
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[10px] xl:p-[20px] ">
      <div>
        <div className="flex w-[100%] justify-between">
          <h4 className="text-[20px]">{examName}</h4>
          <button>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-[20px] text-[#C3554E]"
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 xl:gap-4 pt-[12px]">
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]">Edit</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]" onClick={() => {navigate(`/exams/professor/setting/${1}`)}}>Setting</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]" onClick={() => {navigate(`/exams/professor/scoring/${1}`)}}>Score</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]">Dashboard</button>
        </div>
      </div>
    </div>
  );
}
