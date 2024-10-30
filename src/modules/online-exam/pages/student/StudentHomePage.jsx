import { useEffect,useState } from "react";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/student/HomePage/ExamCard";
import HistoryCard from "../../components/student/HomePage/HistoryCard";

import { getStudentExamsById, getHistoryStudentExams } from "../../services/apis/studentApi";

export default function StudentHomePage() {
  const [exams, setExams] = useState([]);
  const [historyExams, setHistoryExams] = useState([]);

  const getExams = async () => {
    const res = await getStudentExamsById(123456);
    setExams(res.data.data);
  }

  const getHistoryExams = async () => {
    const res = await getHistoryStudentExams(123456);
    setHistoryExams(res.data.data);
  }

  useEffect(() => {
    getExams();
    getHistoryExams();
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
            <ExamCard examName={examName.title} Id={examName.id}/>
          ))}
        </div>
        <hr className='my-[20px] border-[1px] bg-[#BEBEBE]' />
        <h3 className="font-bold text-[22px] xl:text-[30px]">History</h3>
        <div className="grid gap-4 py-[20px]">
          {historyExams.map((examName) => (
            <HistoryCard examName={examName.title} Id={examName.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
