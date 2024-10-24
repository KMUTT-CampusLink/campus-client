import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Question from "../../components/student/ExamPage/Question";
import Navigation from "../../components/student/ExamPage/Navigation";

// Mock Data
const questionMock = [
  [1, "multipleChoice", "What is 1 + 1?", ["2", "3", "4", "5"]],
  [2, "checkList", "Which numbers are even?", ["1", "2", "3", "4"]],
  [3, "essay", "Describe your favorite programming language.", []],
  [4, "multipleChoice", "What is 2 + 2?", ["3", "4", "5", "6"]],
];

export default function StudentExamPage() {
  const [studentQuestion, setStudentQuestion] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const navigate = useNavigate();

  // Handle answer for each question
  const handleAnswer = (questionNo, answer) => {
    setStudentAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNo]: answer,
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    if (studentQuestion < questionMock.length - 1) {
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
    if (n >= 0 && n < questionMock.length) {
      setStudentQuestion(n);
    }
  };

  // Submit answers to backend
  const handleSubmit = () => {
    console.log(studentAnswers);
  };

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <div className="flex flex-col xl:flex-row justify-between pt-[35px] xl:pt-[50px] gap-[20px]">
          {/* Question */}
          {questionMock
            .filter((question, index) => index === studentQuestion)
            .map((question, index) => (
              <Question
                key={index}
                questionNo={question[0]}
                question={question[2]}
                choice={question[3]}
                type={question[1]}
                handleAnswer={handleAnswer}
                studentAnswer={studentAnswers[question[0]] || []}
              />
            ))}
          {/* Question Navigation */}
          <Navigation
            questionNo={questionMock}
            studentQuestion={studentQuestion}
            jumpTo={jumpTo}
          />
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
              disabled={studentQuestion === questionMock.length - 1}
              onClick={handleNext}
              className={`${studentQuestion !== questionMock.length - 1 ? "underline-offset-3 hover:underline" : " text-gray-400"}`}
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
                  onClick={handleSubmit()}
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
