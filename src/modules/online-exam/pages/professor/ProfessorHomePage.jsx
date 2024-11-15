import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/professor/HomePage/ExamCard";

import { getExams } from "../../services/apis/professerApi";

export default function ProfessorHomePage() {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const [exams, setExams] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const getAllExams = async () => {
    const res = await getExams(sectionId);
    setExams(res.data);
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    getAllExams();
  }, []);

  useEffect(() => {
    if (location.state?.isSettingSubmit) {
      setAlertVisible(true);
      setAlertMessage(location.state.alertMessage);
      setIsSubmit(location.state.isSettingSubmit);
      navigate(location.pathname, { replace: true });
      const timer = setTimeout(() => setAlertVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

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
              navigate(`/exams/professor/create/${sectionId}`)
            }}
          >
            Create Exam <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={`grid gap-4 py-[20px] ${exams && exams.length === 0 ? "hidden" : "block"}`}>
          {exams && exams.map((examName) => (
            <ExamCard examName={examName.title} examId={examName.id} refresh={handleRefresh}></ExamCard>
          ))}
        </div>
        <div className={`${exams && exams.length === 0 ? "flex" : "hidden"} h-[20vh] w-auto justify-center items-center`}>
          <h1 className="text-[18px]">No Exam</h1>
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