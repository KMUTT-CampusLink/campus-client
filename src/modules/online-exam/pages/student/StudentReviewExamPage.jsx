import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from '../../../registration/components/NavBarComponents/NavBar'
import Chip from '../../components/professor/Scoring/Chip'
import Question from '../../components/student/ReviewExamPage/Question'
import { getStudentReview } from "../../services/apis/studentApi";
import { getStudentScore } from "../../services/apis/professerApi";
import { getFullMark } from "../../services/apis/studentApi";


export default function StudentReviewExamPage() {
  const [permission, setPermission] = useState(1);
  const [studentAns, setStudentAns] = useState([]);
  const { examId } = useParams();
  const studentExamId = useParams().studentExamId;
  const [studentScore, setStudentScore] = useState(0);
  const [fullMark,setFullMark] = useState(0);
  const fetchStudentAnswer = async () => {
    try {
      const res = await getStudentReview(examId);
      console.log(res);
      setStudentAns(res.data);
    } catch (error) {
      console.error(error);
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
  const getStudentFullMark = async() => {
    try {
      const response = await getFullMark(examId);
      setFullMark(response.data.data.full_mark);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudentAnswer();
    getScore();
    getStudentFullMark();
  }, []);
  return (
    <>
      <NavBar />
      {/*Heading*/}
      <div className="px-[26px] py-[35px] lg:px-[200px] pt-20">
        <div className="flex justify-between items-center pb-3">
          <p className="font-bold text-[#D4A015] text-[22px] lg:text-[30px]">
            Exam 1
          </p>
          <div className="flex flex-col items-end">
            <Chip />
            <div className="flex gap-1">
              <p className="text-[22px] lg:text-[30px]">
                {studentScore}/{fullMark}
              </p>
              {/* <p className="text-[30px]">/</p>
            <p className="text-[30px]">100</p> */}
            </div>
          </div>
        </div>
        <div className={`${permission === 1 ? "block" : "hidden"}`}>
          <hr className="border" />
          <div className="my-10 flex flex-col gap-[20px]">
            {studentAns.map((item, index) => (
              <Question
                key={index}
                question={item.title}
                choice={item.exam_choice}
                type={item.type}
                studentAnswer={item.student_answer}
                questionId={item.id}
                examId={examId}
                className="w-[67%] h-auto"
              />
            ))}
          </div>
        </div>
        <div
          className={`${
            permission === 1 ? "hidden" : "block"
          } flex w-full h-[80vh] justify-center items-center text-center`}
        >
          <b>The professor does not allow reviewing the exam.</b>
        </div>
      </div>
    </>
  );
}
