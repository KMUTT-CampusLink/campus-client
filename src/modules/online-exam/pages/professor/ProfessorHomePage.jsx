import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import ExamCard from "../../components/professor/HomePage/ExamCard";
import BackBTN from "../../components/BackBTN";

import {
  getExams,
  getGradingDate,
  updateExpandDays,
  updateAnnouceGrades
} from "../../services/apis/professerApi";

import verifySection from "../../middleware/verifySection";

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

  const [gradingDate, setGradingDate] = useState(null);
  const [semesterEndDate, setSemesterEndDate] = useState(null);
  const [gradingAlertVisible, setGradingAlertVisible] = useState(false);
  const [gradingAlertMessage, setGradingAlertMessage] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState(false);
  const [notifyDate, setNotifyDate] = useState(null);
  const [gradeStatus, setGradeStatus] = useState(false);
  const getAllExams = async () => {
    try {
      const res = await getExams(sectionId);
      const exam = res.data.exam;
      setPendingExam(exam.filter((exams) => !exams.publish_status));
      setPublishExam(exam.filter((exams) => exams.publish_status));
      setHistoryExam(res.data.historyExam);
      setCourseTitle(res.data.courseTitle[0].name);
      const section = res.data.section[0];
      setIsExpanded(section.is_grading_expand);
      setIsAnnounced(section.grade_announce_status);
    } catch (error) {
      console.log(error);
    }
  };
  const getSectionGradingDate = async () => {
    try {
      const res = await getGradingDate(sectionId);
      console.log(res)
      const { gradingDate, semesterEndDate, gradeAnnounceStatus } = res.data;
      setGradingDate(gradingDate);
      setSemesterEndDate(semesterEndDate);
      setGradeStatus(gradeAnnounceStatus);
      const semesterEnd = new Date(semesterEndDate);
      const notifyDate = new Date(semesterEnd);
      notifyDate.setDate(notifyDate.getDate() + 30); 
      setNotifyDate(notifyDate);
      const now = new Date();
      if (now >= new Date(semesterEndDate) && now <= new Date(notifyDate)) {
        setGradingAlertVisible(true);
        setGradingAlertMessage(
          `${new Date(gradingDate).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          })}.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(notifyDate);
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

  const handleExpandDaysClick = async () => {
    try {
      const response = await updateExpandDays(sectionId, true);
      setIsExpanded(true);
    } catch (error) {
      console.error("Error updating Expand Days:", error);
    }
  };
  const handleAnnoucrGradeClick = async () => {
    try {
      const response = await updateAnnouceGrades(sectionId, true);
      console.log(response); 
      setIsAnnounced(true);
    } catch (error) {
      console.error("Error updating Expand Days:", error);
    }
  };
  useEffect(() => {
    getAllExams();
    getSectionGradingDate();
  }, []);

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <BackBTN />
        {gradeStatus && (
          <div className="bg-gray-400 text-white p-4 rounded-md mb-5 text-center">
            <p>Grade have been announced</p>
          </div>
        )}
        {(gradingAlertVisible && !isAnnounced) && (
          <div className="py-10  px-10 bg-[#7F483C] text-white rounded-md mb-5">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-[25px]"
              />
              <h1 className=" text-[25px] font-bold">
                Please ensure all student exam answers are reviewed before{" "}
                <span className="text-[#ffd257]"> {gradingAlertMessage}</span>
              </h1>
            </div>

            <p className=" text-md">
              If you are unable to complete the review on time, please click{" "}
              <span className="font-bold text-[#ffd257]">"Expand Days"</span> to
              extend the deadline.
            </p>

            <hr className="my-2" />
            <p className="text-sm">
              <span className="font-bold ">Note:</span> By extending the
              deadline, the grades will be marked as pending. Once you have
              completed the review, you will need to manually click{" "}
              <span className="font-bold text-[#ffd257]">"Announce Grade"</span>{" "}
              to finalize and publish the grades.
            </p>
            <div className="flex gap-2 mt-2 ">
              <button
                className="btn border-none xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]"
                onClick={handleExpandDaysClick}
                disabled={isExpanded}
              >
                Exapand Days
              </button>
              <button
                disabled={!isExpanded}
                onClick={handleAnnoucrGradeClick}
                className="btn border-none xl:px-[20px] xl:text-[16px] text-white bg-[#E98713] hover:bg-[#d2801b]"
              >
                Announce Grade
              </button>
            </div>
          </div>
        )}
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
          <h1 className="text-[20px] font-bold">Pending Approve Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${
              pendingExam && pendingExam.length === 0 ? "hidden" : "block"
            }`}
          >
            {pendingExam &&
              pendingExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  status={"pending"}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${
              pendingExam && pendingExam.length === 0 ? "flex" : "hidden"
            } h-[20vh] w-auto justify-center items-center`}
          >
            <h1 className="text-[18px]">No Exam</h1>
          </div>
        </div>
        <div className="pt-[20px]">
          <h1 className="text-[20px] font-bold">Published Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${
              publishExam && publishExam.length === 0 ? "hidden" : "block"
            }`}
          >
            {publishExam &&
              publishExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  status={"approved"}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${
              publishExam && publishExam.length === 0 ? "flex" : "hidden"
            } h-[20vh] w-auto justify-center items-center`}
          >
            <h1 className="text-[18px]">No Exam</h1>
          </div>
        </div>
        <div>
          <h1 className="text-[20px] font-bold">History Exam</h1>
          <div
            className={`grid gap-4 py-[20px] ${
              historyExam && historyExam.length === 0 ? "hidden" : "block"
            }`}
          >
            {historyExam &&
              historyExam.map((examName) => (
                <ExamCard
                  examName={examName.title}
                  examId={examName.id}
                  refresh={handleRefresh}
                  sectionId={sectionId}
                  status={"history"}
                ></ExamCard>
              ))}
          </div>
          <div
            className={`${
              historyExam && historyExam.length === 0 ? "flex" : "hidden"
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
