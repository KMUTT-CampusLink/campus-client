import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ExamCard({ examName }) {
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
        <div className="flex flex-wrap gap-1 xl:gap-10 pt-[12px]">
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713]">Edit</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713]">Setting</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713]">Score</button>
          <button className="btn xl:px-[20px] xl:text-[16px] text-white bg-[#E98713]">Dashboard</button>
        </div>
      </div>
    </div>
  );
}
