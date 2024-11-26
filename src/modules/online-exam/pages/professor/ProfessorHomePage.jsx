import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/professor/HomePage/ExamCard";
import BackBTN from "../../components/BackBTN";

import { getExams } from "../../services/apis/professerApi";

import verifySection from "../../middleware/verifySection"

function ProfessorHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId } = useParams();
  const [pendingExam, setPendingExam] = useState([]);
  const [publishExam, setPublishExam] = useState([]);
  const [historyExam, setHistoryExam] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const getAllExams = async () => {
    try {
      const res = await getExams(sectionId);
      setPendingExam(res.data.exam.filter((exams) => { !exams.publish_status }));
      setPublishExam(res.data.exam.filter((exams) => { exams.publish_status }));
      setHistoryExam(res.data.historyExam);
      setCourseTitle(res.data.courseTitle[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (location.state?.isSettingSubmit) {
      setAlertVisible(true);
      setAlertMessage(location.state.alertMessage);
      setIsSubmit(location.state.isSettingSubmit);
      navigate(location.pathname, { replace: true });
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    getAllExams();
  }, []);

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <BackBTN />
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          {courseTitle}
        </h2>
        <hr className="mt-[20px] bg-[#BEBEBE] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">Examination</h3>
          <button
            className="btn bg-[#7F483C] hover:bg-[#6f4036] text-white rounded-lg"
            onClick={() => {
              navigate(`/exams/professor/create/${sectionId}`);
            }}
          >
            Create Exam <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="pt-[20px]">
          <h1 className="text-[20px] font-bold">Pending Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${pendingExam && pendingExam.length === 0 ? "hidden" : "block"
              }`}
          >
            {pendingExam &&
              pendingExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  expired={false}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${pendingExam && pendingExam.length === 0 ? "flex" : "hidden"
              } h-[20vh] w-auto justify-center items-center`}
          >
            <h1 className="text-[18px]">No Exam</h1>
          </div>
        </div>
        <div className="pt-[20px]">
          <h1 className="text-[20px] font-bold">Published Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${publishExam && publishExam.length === 0 ? "hidden" : "block"
              }`}
          >
            {publishExam &&
              publishExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  expired={false}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${publishExam && publishExam.length === 0 ? "flex" : "hidden"
              } h-[20vh] w-auto justify-center items-center`}
          >
            <h1 className="text-[18px]">No Exam</h1>
          </div>
        </div>
        <div className="pt-[20px]">
          <h1 className="text-[20px] font-bold">History Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${historyExam && historyExam.length === 0 ? "hidden" : "block"
              }`}
          >
            {historyExam &&
              historyExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  expired={true}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${historyExam && historyExam.length === 0 ? "flex" : "hidden"
              } h-[20vh] w-auto justify-center items-center`}
          >
            <h1 className="text-[18px]">No Exam</h1>
          </div>
        </div>
      </div>
      {alertVisible && (
        <div className="toast toast-center">
          <div
            className={`alert ${isSubmit ? "alert-success" : "alert-error"}`}
          >
            <span className="text-white">{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default verifySection(ProfessorHomePage);