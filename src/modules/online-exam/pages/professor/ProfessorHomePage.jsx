import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/professor/HomePage/ExamCard";

import { getExams } from "../../services/apis/professerApi";

export default function ProfessorHomePage() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);

  const getAllExams = async () => {
    const res = await getExams();
    console.log(res)
    setExams(res.data);
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    getAllExams();
  }
  , []);

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#BEBEBE] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">Examination</h3>
          <button
            className="btn bg-[#7F483C] hover:bg-[#6f4036] text-white rounded-lg"
            onClick={() => { 
              navigate(`/exams/professor/create/${1}`) 
            }}
          >
            Create Exam <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="grid gap-4 py-[20px]">
          {exams.map((examName) => (
            <ExamCard examName={examName.title} examId={examName.id} refresh={handleRefresh}></ExamCard>
          ))}
        </div>
      </div>
    </div>
  );
}