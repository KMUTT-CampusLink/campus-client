import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/student/HomePage/ExamCard";
import InProgressCard from "../../components/student/HomePage/InProgressCard";
import HistoryCard from "../../components/student/HomePage/HistoryCard";
import BackBTN from "../../components/BackBTN";
import {
  getStudentExamsById,
  getHistoryStudentExams,
  getInprogressExam,
} from "../../services/apis/studentApi";

import verifySection from "../../middleware/verifySection"

function StudentHomePage() {
  const { sectionId } = useParams();
  const [exams, setExams] = useState([]);
  const [historyExams, setHistoryExams] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  const getExams = async () => {
    const res = await getStudentExamsById(sectionId);
    setExams(res.data.exam);
    setCourseTitle(res.data.courseTitle[0].name);
  };

  const getInprogressExams = async () => {
    const res = await getInprogressExam(sectionId);
    setInProgress(res.data.data);
  };

  const getHistoryExams = async () => {
    const res = await getHistoryStudentExams(sectionId);
    setHistoryExams(res.data.data);
  };

  useEffect(() => {
    getExams();
    getInprogressExams();
    getHistoryExams();
  }, []);

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
          <BackBTN />
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          {courseTitle}
        </h2>
        <div className={`${inProgress.length > 0 ? "block" : "hidden"}`}>
          <hr className="mt-[20px] bg-[#798184] flex justify-center" />
          <div className=" flex justify-between pt-[20px]">
            <h3 className="font-bold text-[22px] xl:text-[30px]">
              In Progress
            </h3>
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
            {exams.map((examName, index) => (
              <ExamCard
                key={index}
                examName={examName.title}
                Id={examName.id}
              />
            ))}
          </div>
        </div>
        <div
          className={`${exams.length > 0 ? "hidden" : "block"
            } w-full flex justify-center`}
        >
          <h3 className="text-[#798184] pt-[10px]">No Exam</h3>
        </div>
        <hr className="my-[20px] bg-[#798184]" />
        <h3 className="font-bold text-[22px] xl:text-[30px]">History</h3>
        <div
          className={`${historyExams.length > 0 ? "block" : "hidden"
            } grid gap-4 py-[20px]`}
        >
          {historyExams.map((examName, index) => (
            <HistoryCard
              key={index}
              examName={examName.title}
              Id={examName.id}
              studentExamId={examName.studentexamid}
            />
          ))}
        </div>
        <div
          className={`${historyExams.length > 0 ? "hidden" : "block"
            } w-full flex justify-center`}
        >
          <h3 className="text-[#798184] pt-[10px]">No History</h3>
        </div>
      </div>
    </div>
  );
}

export default verifySection(StudentHomePage);