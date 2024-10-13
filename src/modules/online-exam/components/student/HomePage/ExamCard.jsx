import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ExamCard({examName}) {
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[15px] xl:p-[20px] flex justify-between items-center">
      <h4 className="text-[20px]">{examName}</h4>
      <button><FontAwesomeIcon icon={faArrowRight} className="text-[20px]"/></button>
    </div>
  );
}
