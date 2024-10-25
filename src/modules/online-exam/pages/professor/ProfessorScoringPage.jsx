import { useState } from "react";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import PassedChip from "../../components/professor/Scoring/PassedChip";
import FailedChip from "../../components/professor/Scoring/FailedChip";
import ProcessingChip from "../../components/professor/Scoring/ProcessingChip";
import Question from "../../components/professor/Scoring/Question";

//Mock Data
const questionMock = [
  [1, "multipleChoice", "1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
  [2, "checkList", "2Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
  [3, "essay", "3Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", []],
  [4, "multipleChoice", "4Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
];

export default function ProfessorScoringPage() {
  const [activeButton, setActiveButton] = useState("multipleChoice");
  const [studentQuestion, setStudentQuestion] = useState(0);
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
            <PassedChip />
            {/* <FailedChip />
          <ProcessingChip /> */}
            <div className="flex gap-1">
              <p className="text-[22px] lg:text-[30px]">100/100</p>
              {/* <p className="text-[30px]">/</p>
            <p className="text-[30px]">100</p> */}
            </div>
          </div>
        </div>
        {/* exam type button group */}
        <div className="flex justify-evenly font-semibold text-[20px] pb-5">
          <button
            className={`focus:underline decoration-[#D4A015] decoration-2 underline-offset-[5px] ${activeButton === "multipleChoice" ? "underline" : ""
              }`}
            onClick={() => setActiveButton("multipleChoice")}
          >
            Multiple choice
          </button>
          <button
            className={`focus:underline decoration-[#D4A015] decoration-2 underline-offset-[5px]  ${activeButton === "essay" ? "underline" : ""
              }`}
            onClick={() => setActiveButton("essay")}
          >
            Essay
          </button>
        </div>
        <hr className="border" />
        <div className=" my-10 flex flex-col gap-[20px]">
          {questionMock
            .filter(item => item[1] === activeButton || (activeButton === "multipleChoice" && item[1] === "checkList" ? true : false))  // Filtering items where the value at [1] is not "essay"
            .map((filteredItem, index) => (
              <Question
                key={index}
                questionNo={filteredItem[0]}  // Assuming the question number is at index [0]
                question={filteredItem[2]}    // Assuming the question text is at index [2]
                choice={filteredItem[3]}      // Assuming the choices are at index [3]
                type={filteredItem[1]}        // Assuming the type is at index [1]
                className="w-[67%] h-auto"
              />
            ))}
        </div>
      </div>
    </>
  );
}