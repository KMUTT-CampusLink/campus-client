import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import Participant from "../../components/professor/overrallScoring/Participant";
import PublishScoreButton from "../../components/professor/overrallScoring/PublishScoreButton";

import { getExamDataById } from "../../services/apis/professerApi";
import { getExamParticipants } from "../../services/apis/professerApi";

export default function ProfessorOverallScoringPage() {
  const { examId } = useParams();
  const [examTitle, setExamTitle] = useState("");
  const [participants, setParticipants] = useState([]);
  const [fullMark, setFullMark] = useState(0);
  const [passMark, setPassMark] = useState(0);
  const [scoringFinished, setScoringFinished] = useState(0);

  const getParticipants = async () => {
    try {
      const response = await getExamParticipants(examId);
      setFullMark(response.data.full_mark);
      setPassMark(response.data.pass_mark);
      setParticipants(response.data.data);
      setScoringFinished(response.data.data.filter(participant => participant.is_checked).length);
    } catch (error) {
      console.log(error);
    }
  }

  const getExamTitle = async () => {
    try {
      const response = await getExamDataById(examId);
      setExamTitle(response.data.data.exam.title);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getParticipants();
    getExamTitle();
  },[]);

  return (
    <>
      <NavBar />
      {/* Heading */}
      <div className="px-[26px] lg:px-[200px] pt-20">
        <div className="flex justify-between items-center py-[35px]">
          <div>
            <p className="font-bold text-[#D4A015] text-[30px]">Scoring</p>
            <p className="text-[16px]">{examTitle} Exam</p>
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
            <p className="">{scoringFinished}</p>
            <p className="">/</p>
            <p className="">{participants.length}</p>
            <p className="">
              <span>&nbsp;</span>student
            </p>
          </div>

          <p className="w-[100%] flex rounded-lg text-[12px] text-center lg:text-[14px] py-[15px] gap-[10px]">
            <p className="w-[20%]">ID number</p>
            <p className="w-[45%]">Name</p>
            <p className="w-[10%]">Score</p>
            <p className="w-[10%]">Total score</p>
            <p className="w-[15%]">Status</p>
          </p>
          <hr className="border-t border-[#798184] pb-[20px]" />
          <Participant examId={examId} participants={participants} fullMark={fullMark} passMark={passMark}/>
        </div>
      </div>
    </>
  );
}
