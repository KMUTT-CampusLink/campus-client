import { useEffect,useState } from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/student/HomePage/ExamCard";
import HistoryCard from "../../components/student/HomePage/HistoryCard";

import { getStudentExams } from "../../services/apis/studentApi";

const dataMock = [["Exam1", 1], ["Exam2", 2], ["Exam3", 3], ["Exam4", 4], ["Exam5", 5]];
const dataHistoryMock = [["Exam1", 1], ["Exam2", 2], ["Exam3", 3]];

export default function StudentHomePage() {
  const [exams, setExams] = useState([]);
  const [historyExams, setHistoryExams] = useState([]);

  const getExams = async () => {
    const res = await getStudentExams();
    setExams(res.data.data);
  }

  useEffect(() => {
    getExams();
  },[]);

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#798184] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">Examination</h3>
        </div>
        <div className="grid gap-4 py-[20px]">
          {exams.map((examName) => (
            <ExamCard examName={examName.title} Id={examName.id}></ExamCard>
          ))}
        </div>
        <hr className='my-[20px] border-[1px] bg-[#BEBEBE]' />
        <h3 className="font-bold text-[22px] xl:text-[30px]">History</h3>
        <div className="grid gap-4 py-[20px]">
          {dataHistoryMock.map((examName) => (
            <HistoryCard examName={examName[0]} Id={examName[1]}></HistoryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
