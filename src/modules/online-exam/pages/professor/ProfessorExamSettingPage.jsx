import React, { useState } from "react";
// import NavBar from "../../../registration/components/NavBar";
import PublishButton from "../../components/professor/ExamSetting/PublishButton";
import Submit from "../../components/professor/ExamSetting/Submit";
import DeleteExam from "../../components/professor/ExamSetting/DeleteExamButton";
export default function ProfessorExamSettingPage() {
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  return (
    <>
      {/* <NavBar /> */}
      {/* Heading */}
      <div className="flex justify-between px-[26px] py-[35px] lg:px-[200px]">
        <div>
          <p className="font-bold text-[#D4A015] text-[30px]">Setting</p>
          <p className="text-[16px]">Linear Algebra Exam</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="">Exam Password</p>{" "}
          <button className="bg-[#7F483C] p-[10px] px-[20px] text-center text-[white] text-[18px] rounded-2xl">
            DF1E22
          </button>
        </div>
      </div>
      <hr className="border-t border-[#798184]" />
      {/* Content */}
      <div className="flex flex-col px-[36px] py-[35px] lg:px-[200px]">
        <div className="flex flex-col gap-[10px] sm:items-center pb-[20px] sm:flex-row">
          <label
            className="pr-[15px] text-[black] text-[18px] font-bold"
            for="meeting-time"
          >
            Exam duration
          </label>

          <input
            className="border-2 border-[#798184] rounded-xl px-[15px] py-[7px]"
            type="datetime-local"
            id="start-datetime"
            name="start-datetime"
            value={startDatetime}
            onChange={(e) => setStartDatetime(e.target.value)}
          />
          <p>to</p>
          <input
            className="border-2 border-[#798184] rounded-xl px-[15px] py-[7px]"
            type="datetime-local"
            id="end-datetime"
            name="end-datetime"
            value={endDatetime}
            onChange={(e) => setEndDatetime(e.target.value)}
          />
        </div>
        <div className="flex gap-[10px] items-center">
          <label
            className="pr-[19px] text-[black] text-[18px] font-bold"
            for="meeting-time"
          >
            Passing marks
          </label>
          <input
            className="border-2 border-[#798184] rounded-xl  px-[10px] py-[7px] text-center w-[80px] appearance-none"
            type="number"
            placeholder="50"
            name=""
            id=""
            min="0"
            value={passingMarks}
            onChange={(e) => setPassingMarks(e.target.value)}
          />
          <p>/</p>
          <p>100</p>
        </div>
      </div>
      <hr className="border-t border-[#798184] mx-[36px] lg:mx-[200px]" /> 
      {/* Content 2*/}
      <div className="px-[36px] lg:px-[200px] py-[35px]">
        {/* exam history */}
        <div className="flex items-center pb-[20px] justify-between">
          <div className="">
            <p className="pr-[15px] text-[black] text-[18px] font-bold">
              Exam History
            </p>
            <p className="text-[16px]">
              Enable students access to their exam records
            </p>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="toggle" defaultChecked />
              <span className="label-text ml-[10px]">Allow</span>
            </label>
          </div>
        </div>
        {/* shuffle QA */}
        <div className="flex items-center pb-[20px] justify-between">
          <div className="">
            <p className="pr-[15px] text-[black] text-[18px] font-bold">
              Shuffle questions
            </p>
            <p className="text-[16px]">
              Rearranges the order of exam questions
            </p>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="toggle" />
              <span className="label-text ml-[10px]">Allow</span>
            </label>
          </div>
        </div>
      </div>
      <hr className="border-t border-[#798184] mx-[36px] lg:mx-[200px]" />
      {/* Publish exam */}
      <div className="px-[36px] lg:px-[200px] py-[35px]">
        <div className="flex items-center pb-[20px] justify-between">
          <div className="">
            <p className="pr-[15px] text-[black] text-[18px] font-bold">
              Publish exam
            </p>
            <p className="text-[16px]">
              Enable students to access and begin the exam
            </p>
          </div>
          <PublishButton />
        </div>
      </div>
      {/* Delete exam */}
      <div className="flex justify-center mb-[60px] gap-[10px] px-[100]">
        <DeleteExam />
        <Submit start={startDatetime} end={endDatetime} mark={passingMarks} />
      </div>
    </>
  );
}
