import { useEffect, useState } from "react";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/student/HomePage/ExamCard";
import InProgressCard from "../../components/student/HomePage/InProgressCard";
import HistoryCard from "../../components/student/HomePage/HistoryCard";

import { getStudentExamsById, getHistoryStudentExams, getInprogressExam } from "../../services/apis/studentApi";

export default function StudentHomePage() {
  const [exams, setExams] = useState([]);
  const [historyExams, setHistoryExams] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const sectionId = 1001;

  const getExams = async () => {
    const res = await getStudentExamsById(sectionId);
    setExams(res.data.data);
  }

  const getInprogressExams = async () => {
    const res = await getInprogressExam();
    setInProgress(res.data.data);
  }

  const getHistoryExams = async () => {
    const res = await getHistoryStudentExams();
    setHistoryExams(res.data.data);
  }

  useEffect(() => {
    getExams();
    getInprogressExams();
    getHistoryExams();
  }, []);
  
  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <div className={`${inProgress.length > 0 ? "block" : "hidden"}`}>
          <hr className="mt-[20px] bg-[#798184] flex justify-center" />
          <div className=" flex justify-between pt-[20px]">
            <h3 className="font-bold text-[22px] xl:text-[30px]">In Progress</h3>
          </div>
          <div className="grid gap-4 py-[20px]">
            {inProgress.map((examName) => (
              <InProgressCard examName={examName.title} Id={examName.id} />
            ))}
          </div>
        </div>
        <hr className="mt-[20px] bg-[#798184] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">Examination</h3>
        </div>
        <div className={`${exams.length > 0 ? "block" : "hidden"}`}>
          <div className="grid gap-4 py-[20px]">
            {exams.map((examName) => (
              <ExamCard examName={examName.title} Id={examName.id} />
            ))}
          </div>
        </div>
        <div className={`${exams.length > 0 ? "hidden" : "block"} w-full flex justify-center`}>
          <h3 className="text-[#798184] pt-[10px]">No Exam</h3>
        </div>
        <hr className='my-[20px] bg-[#798184]' />
        <h3 className="font-bold text-[22px] xl:text-[30px]">History</h3>
        <div className={`${historyExams.length > 0 ? "block" : "hidden"} grid gap-4 py-[20px]`}>
          {historyExams.map((examName) => (
            <HistoryCard examName={examName.title} Id={examName.id} />
          ))}
        </div>
        <div className={`${historyExams.length > 0 ? "hidden" : "block"} w-full flex justify-center`}>
          <h3 className="text-[#798184] pt-[10px]">No History</h3>
        </div>
      </div>
    </div>
  );
}
