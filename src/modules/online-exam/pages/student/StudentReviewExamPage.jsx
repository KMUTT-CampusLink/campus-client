import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import BackBTN from "../../components/BackBTN";
import Chip from "../../components/professor/Scoring/Chip";
import Question from "../../components/student/ReviewExamPage/Question";
import { getStudentExamReview } from "../../services/apis/studentApi";

export default function StudentReviewExamPage() {
  const [data, setData] = useState(null);
  const [permission, setPermission] = useState(false);
  const examId = useParams().examId;
  const studentExamId = useParams().studentExamId;
  const fetchReview = async () => {
    try {
      const res = await getStudentExamReview(examId, studentExamId);
      setPermission(res.PermissionStatus.view_history);
      setData(res.response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);

  if (!data) {
    return;
  }

  return (
    <>
      <NavBar />
      {/*Heading*/}
      <div className="mx-[35px] xl:mx-[100px] pb-[30px] pt-20">
        <BackBTN />
        <div className="flex justify-between items-center pb-3">
          <p className="font-bold text-[#D4A015] text-[22px] lg:text-[30px]">
            {data.title}
          </p>
          <div className="flex flex-col items-end">
            <Chip
              status={true}
              passMark={data.pass_mark}
              score={data.total_score}
            />
            <div className="flex gap-1">
              <p className="text-[22px] lg:text-[30px]">
                {data.total_score}/{data.full_mark}
              </p>
            </div>
          </div>
        </div>
        {permission && (
          <div>
            <hr className="border" />
            <div className="my-10 flex flex-col gap-[20px]">
              {data.studentAnswers &&
                data.studentAnswers.map((item, index) => (
                  <Question
                    key={index}
                    question={item.title}
                    choice={item.exam_choice}
                    type={item.type}
                    studentAnswer={item.student_answer}
                    comment={item.student_answer[0].essay_comment}
                    questionNo={item.id}
                    mark={item.mark}
                    score={item.score}
                    questionImg={item.question_img}
                    className="w-[67%] h-auto"
                  />
                ))}
            </div>
          </div>
        )}
        <div
          className={`${
            permission ? "hidden" : "block"
          } flex w-full h-[80vh] justify-center items-center text-center`}
        >
          <b>The professor does not allow reviewing the exam.</b>
        </div>
      </div>
    </>
  );
}
