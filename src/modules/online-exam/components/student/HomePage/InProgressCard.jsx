import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function InProgressCard({examName, Id}) {
  const navigate = useNavigate();

  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[15px] xl:p-[20px] flex justify-between items-center">
      <h4 className="text-[20px]">{examName}</h4>
      <button className="btn text-white bg-[#E98713] hover:bg-[#d2801b]" onClick={() => {
        navigate(`/exams/student/exam/${Id}`);
      }}><p>Continue</p><FontAwesomeIcon icon={faArrowRight} className="text-[20px]"/></button>
    </div>
  );
}
