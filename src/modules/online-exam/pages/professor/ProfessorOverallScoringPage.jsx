import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Participant from "../../components/professor/overrallScoring.jsx/Participant";
import PublishScoreButton from "../../components/professor/overrallScoring.jsx/PublishScoreButton";
export default function ProfessorOverallScoringPage() {
  return (
    <>
      <NavBar />
      {/* Heading */}
      <div className="px-[26px] lg:px-[200px] pt-20">
        <div className="flex justify-between items-center py-[35px]">
          <div>
            <p className="font-bold text-[#D4A015] text-[30px]">Scoring</p>
            <p className="text-[16px]">Linear Algebra Exam</p>
          </div>
          <div>
            <PublishScoreButton />
          </div>
        </div>
        <hr className="border-t border-[#798184]" />
        {/* content */}
        <div className=" py-[30px] ">
          <p className="font-bold text-[#D4A015] text-[22px] ">Participants</p>
          <div className="flex pb-[10px]">
            <p className="text-[16px] font-bold">
              Scoring finished:<span>&nbsp;</span>
            </p>
            <p className="">40</p>
            <p className="">/</p>
            <p className="">100</p>
            <p className="">
              <span>&nbsp;</span>student
            </p>
          </div>

          <p className="w-[100%] flex rounded-lg text-[12px] items-center lg:text-[14px] px-[20px] py-[15px] gap-[10px]">
            <p className="w-[30%]">ID number</p>
            <p className="w-[35%]">Name</p>
            <p className="w-[10%]">Score</p>
            <p className="w-[10%]">Total score</p>
            <p className="w-[15%]">Status</p>
          </p>
          <hr className="border-t border-[#798184] pb-[20px]" />

          <Participant />
        </div>
      </div>
    </>
  );
}
