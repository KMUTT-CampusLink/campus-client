import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Question from "../../components/student/ExamPage/Question";
import Navigation from "../../components/student/ExamPage/Navigation";

import { getExamDataById, toggleExamStatus, submitExam } from "../../services/apis/studentApi";

export default function StudentExamPage() {
  const { examId } = useParams();
  const [studentQuestion, setStudentQuestion] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const navigate = useNavigate();

  const [exam, setExam] = useState({
    title: '',
    description: '',
    questions: [],
  });

  const getExamData = async () => {
    try {
      const res = await getExamDataById(examId);
      const examData = res.data.data.exam;
      const examQuestion = res.data.data.questions;
      const allChoices = res.data.data.choices;
      const mappedQuestions = examQuestion && Array.isArray(examQuestion)
        ? examQuestion.map(question => {
          const questionChoices = allChoices.filter(choice => choice.question_id === question.id);
          return {
            questionText: question.title || '',
            type: question.type ? question.type.replace('_', ' ') : 'Multiple Choice',
            options: questionChoices.map(choice => ({
              question_id: choice.question_id,
              choiceId: choice.id,
              choiceText: choice.choice_text || '',
              choiceImg: choice.choice_img || ''
            })),
            answer: questionChoices
              .filter(choice => choice.correct_ans)
              .map(choice => choice.choice_text || ''),
            score: question.mark || null,
            question_id: question.id || null
          };
        })
        : [];
      setExam({
        ...exam,
        title: examData.title || 'Untitled Exam',
        description: examData.description || 'No description',
        questions: mappedQuestions
      });
    } catch (error) {
      console.error("Failed to fetch exam data:", error);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  // Handle answer for each question
  const handleAnswer = (questionId, answer) => {
    setStudentAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    if (studentQuestion < exam.questions.length - 1) {
      setStudentQuestion(studentQuestion + 1);
    }
  };

  // Navigate to previous question
  const handleBack = () => {
    if (studentQuestion > 0) {
      setStudentQuestion(studentQuestion - 1);
    }
  };

  // Jump to specific question
  const jumpTo = (n) => {
    if (n >= 0 && n < exam.questions.length) {
      setStudentQuestion(n);
    }
  };

  // Submit answers to backend
  const handleSubmit = async () => {
    const res = await submitExam(examId, studentAnswers);
    if (res.status === 200) {
      const status = await toggleExamStatus(examId, "123456");
      if (status.status === 200){
        navigate("/exams/student/exam");
      }
    }
  };

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <div className="flex flex-col xl:flex-row justify-between pt-[35px] xl:pt-[50px] gap-[20px]">
          {/* Question */}
          {exam && exam.questions
            .filter((_, index) => index === studentQuestion) // filter by current question
            .map((question, index) => (
              <Question
                key={index}
                questionid={question.question_id}
                questionNo={studentQuestion}
                question={question.questionText}
                choice={question.options}
                type={question.type}
                handleAnswer={handleAnswer}
                studentAnswer={studentAnswers[studentQuestion] || []}
              />
            ))}
          {/* Question Navigation */}
          {exam.questions.length > 0 && (
            <Navigation
              questionNo={exam.questions.length}
              studentQuestion={studentQuestion}
              jumpTo={jumpTo}
            />
          )}
        </div>
        <div className="flex flex-col xl:flex-row justify-between pt-[30px] xl:pt-[40px]">
          <div className="w-full xl:w-[82%] flex justify-between pb-[20px] xl:pb-0">
            {/* Navigate previous and next question */}
            <button
              disabled={studentQuestion === 0}
              onClick={handleBack}
              className={`${studentQuestion !== 0 ? "underline-offset-3 hover:underline" : " text-gray-400"}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            <button
              disabled={studentQuestion === exam.questions.length - 1}
              onClick={handleNext}
              className={`${studentQuestion !== exam.questions.length - 1 ? "underline-offset-3 hover:underline" : " text-gray-400"}`}
            >
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          {/* Submit button */}
          <button
            className="btn w-[100%] xl:w-[200px] bg-[#864E41] text-white rounded-xl ease-in duration-100 hover:bg-[#6e4339]"
            onClick={() => document.getElementById("conformModal").showModal()}
          >
            Submit
          </button>
          {/* Modal */}
          <dialog id="conformModal" className="p-[30px] rounded-xl">
            <h3 className="font-bold text-lg">Confirm Submit the Exam?</h3>
            <p className="py-4">You can submit the exam only once, please review your answers carefully before finalizing your submission.</p>
            <div className="modal-action">
              <form method="dialog" className="flex flex-row gap-[20px]">
                <button className="btn bg-[#EC5A51] hover:bg-[#d5564f] text-white">
                  Close
                </button>
                <button
                  className="btn bg-[#27AE60] hover:bg-[#3f9060] text-white"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
