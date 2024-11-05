import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Chip from "../../components/professor/Scoring/Chip";
import Question from "../../components/professor/Scoring/Question";
import StudentQuestion from "../../components/professor/Scoring/StudentQuestion";

import {
  getStudentScore,
  getExamDataById,
  getStudentAnswers,
  getStudentExam,
  getExamParticipants
} from "../../services/apis/professerApi";

export default function ProfessorScoringPage() {
  const examId = useParams().examId;
  const studentId = useParams().studentId;
  const studentExamId = useParams().studentExamId;
  const [activeButton, setActiveButton] = useState("Multiple Choice");
  const [passMark, setPassMark] = useState(0);
  const [fullMark, setFullMark] = useState(0);
  const [studentScore, setStudentScore] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [studentExamData, setStudentExamData] = useState([]);

  const [exam, setExam] = useState({
    examId: examId,
    title: "",
    description: "",
    questions: [],
  });

  const getParticipants = async () => {
    try {
      const response = await getExamParticipants(examId);
      setFullMark(response.data.full_mark);
      setPassMark(response.data.pass_mark);
    } catch (error) {
      console.log(error);
    }
  }

  const getExamData = async () => {
    try {
      const res = await getExamDataById(examId);
      const examData = res.data.data.exam;
      const examQuestion = res.data.data.questions;
      const allChoices = res.data.data.choices;
      const mappedQuestions =
        examQuestion && Array.isArray(examQuestion)
          ? examQuestion.map((question) => {
              const questionChoices = allChoices.filter(
                (choice) => choice.question_id === question.id
              );
              return {
                questionText: question.title || "",
                type: question.type
                  ? question.type.replace("_", " ")
                  : "Multiple Choice",
                options: questionChoices.map((choice) => ({
                  question_id: choice.question_id,
                  choiceId: choice.id,
                  choiceText: choice.choice_text || "",
                  choiceImg: choice.choice_img || "",
                })),
                answer: questionChoices
                  .filter((choice) => choice.correct_ans)
                  .map((choice) => choice.choice_text || ""),
                score: question.mark || null,
                question_id: question.id || null,
              };
            })
          : [];

      setExam({
        ...exam,
        title: examData.title || "Untitled Exam",
        description: examData.description || "No description",
        questions: mappedQuestions,
      });
    } catch (error) {
      navigate("/exams/student/1");
      console.error("Failed to fetch exam data:", error);
    }
  };

  const getScore = async () => {
    try {
      const response = await getStudentScore(studentExamId);
      setStudentScore(response.data.data.total_score);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnswer = async () => {
    try {
      const response = await getStudentAnswers(examId, studentId);
      setStudentAnswer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getStudentExamData = async () => {
    try {
      const response = await getStudentExam(studentExamId);
      setStudentExamData(response.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExamData();
    getScore();
    getAnswer();
    getStudentExamData();
    getParticipants();
  }, []);

  return (
    <>
      <NavBar />
      {/* Heading */}
      <div className="px-[26px] py-[35px] lg:px-[200px] pt-20">
        <div className="flex justify-between items-center ">
          <div>
            <p className="font-bold text-[#D4A015] text-[22px] lg:text-[30px]">
              Individual Scoring
            </p>
            <div className="text-[12px] lg:text-[16px]">
              <p className="">66130500846</p>
              <p className="">Nudhana Sarutipaisan</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Chip status={studentExamData.isChecked} score={studentScore} passMark={passMark}/>
            <div className="flex gap-1">
              <p className="text-[22px] lg:text-[30px]">
                {studentScore}/{fullMark}
              </p>
            </div>
          </div>
        </div>
        {/* exam type button group */}
        <div className="flex justify-evenly font-semibold text-[20px] pb-5">
          <button
            className={`focus:underline decoration-[#D4A015] decoration-2 underline-offset-[5px] ${
              activeButton === "multipleChoice" ? "underline" : ""
            }`}
            onClick={() => setActiveButton("Multiple Choice")}
          >
            Multiple choice
          </button>
          <button
            className={`focus:underline decoration-[#D4A015] decoration-2 underline-offset-[5px]  ${
              activeButton === "Essay" ? "underline" : ""
            }`}
            onClick={() => setActiveButton("Essay")}
          >
            Essay
          </button>
        </div>
        <hr className="border" />
        <div className=" my-10 flex flex-col gap-[20px]">
          {exam.questions
            .filter(
              (item) =>
                item.type === activeButton ||
                (activeButton === "Multiple Choice" && item.type === "Checklist"
                  ? true
                  : false)
            )
            .map((filteredItem, index) => (
              <StudentQuestion
                key={index}
                studentAnswer={studentAnswer}
                questionid={filteredItem.question_id}
                questionNo={index}
                question={filteredItem.questionText}
                choice={filteredItem.options}
                type={filteredItem.type}
              />
            ))}
        </div>
      </div>
    </>
  );
}
