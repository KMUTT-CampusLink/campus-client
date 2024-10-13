import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import NavBar from "../../../registration/components/NavBar";
import ExamCard from "../../components/professor/HomePage/ExamCard";

const dataMock = ["asasdasdasdd1", "asaddffghfghfd2", "asdqweqweqwadsa3", "asxcvxcvxcvxd4", "asdhjlhlhjlhjfjfgjf5"];

export default function ProfessorHomePage() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] py-[20px]">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#BEBEBE] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">
            Examination
          </h3>
          <button className="btn bg-[#7F483C] hover:bg-[#6f4036] text-white rounded-lg" onClick={navigate("/exams/professor/create")}>
            Create Exam <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="grid gap-4 py-[20px]">
          {dataMock.map((examName) => (
            <ExamCard examName={examName}></ExamCard>
          ))}
        </div>
      </div>
    </div>
  );
}
