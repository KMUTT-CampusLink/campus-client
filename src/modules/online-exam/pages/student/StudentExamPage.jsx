import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Question from "../../components/student/ExamPage/Question";
import Navigation from "../../components/student/ExamPage/Navigation";

//Mock Data
const questionNoMock = [1, 2, 3, 4, 5];
const questionMock = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!",
];
const questionChoiceMock = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
];
const questtionTypeMock = [
  "multipleChoice",
  "checkList",
  "essay",
  "multipleChoice",
  "checkList",
];

export default function StudentExamPage() {
  const [studentQuestion, setStudentQuestion] = useState(0);
  const navigate = useNavigate();

  // Navigate to next question
  const handleNext = () => {
    if (studentQuestion < questionNoMock.length - 1) {
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
    if (n >= 0 && n < questionNoMock.length) {
      setStudentQuestion(n);
    }
  };

  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px]">
        <div className="flex flex-col xl:flex-row justify-between pt-[35px] xl:pt-[50px] gap-[20px]">
          {/* Question */}
          <Question
            questionNo={questionNoMock[studentQuestion]}
            question={questionMock[studentQuestion]}
            choice={questionChoiceMock[studentQuestion]}
            type={questtionTypeMock[studentQuestion]}
            className="w-[67%] h-auto"
          />
          {/* Question Navigation */}
          <Navigation questionNo={questionNoMock} jumpTo={jumpTo} />
        </div>
        <div className="flex flex-col xl:flex-row justify-between pt-[30px] xl:pt-[70px]">
          <Navigation
            questionNo={questionNoMock}
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
              className="underline-offset-3 hover:underline"
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            <button
              disabled={studentQuestion === questionNoMock.length - 1}
              onClick={handleNext}
              className="underline-offset-3 hover:underline"
            >
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          {/* Button to open Modal */}
          <button
            className="btn w-[100%] xl:w-[200px] bg-[#7F483C] text-white rounded-xl ease-in duration-100 hover:bg-[#C76650]"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Submit
          </button>
          {/* submit button then open Modal to confirm submit*/}
          <button
            className="btn w-[100%] xl:w-[200px] bg-[#864E41] text-white rounded-xl ease-in duration-100 hover:bg-[#6e4339]"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Submit
          </button>
          {/* Modal */}
          <dialog id="my_modal_1" className="p-[30px] rounded-xl">
            <h3 className="font-bold text-lg">Confirm Submit the Exam?</h3>
            <p className="py-4">You can submit the exam only once.</p>
            <div className="modal-action">
              <form method="dialog" className="flex flex-row gap-[20px]">
                <button className="btn bg-[#EC5A51] hover:bg-[#d5564f] text-white">
                  Close
                </button>
                <button
                  className="btn bg-[#27AE60] hover:bg-[#3f9060] text-white"
                  onClick={() => {
                    navigate("/exams/student");
                  }}
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
