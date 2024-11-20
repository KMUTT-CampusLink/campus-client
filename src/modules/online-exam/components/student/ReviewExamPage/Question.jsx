import { useEffect, useState } from "react";
import { studentGetStudentScoreById } from "../../../services/apis/studentApi";
import { studentGetQuestionScore } from "../../../services/apis/studentApi";
import { studentGetStudentAnswerById } from "../../../services/apis/studentApi";
export default function Question({
  questionNo,
  question,
  choice,
  type,
  studentAnswer,
  questionId,
  examId,
}) {
  const [frontScore, setFrontScore] = useState(0);
  const [backScore, setBackScore] = useState(0);
  const [comment, setComment] = useState("");
  const getFrontScore = async () => {
    try {
      const response = await studentGetStudentScoreById(questionId);
      setFrontScore(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBackScore = async () => {
    try {
      const response = await studentGetQuestionScore(questionId);
      setBackScore(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComment = async () => {
    try {
      const response = await studentGetStudentAnswerById(examId, questionId);
      setComment(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFrontScore();
    getBackScore();
    getComment();
  }, []);
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[25px] w-full">
      <div className="flex justify-between items-center mb-[20px]">
        <h1>{question}</h1>
        <h1>
          {frontScore}/{backScore}
        </h1>
      </div>
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {type !== "Essay" &&
          choice.map((choiceObj, index) => {
            return (
              <div key={index} className="flex items-center gap-[10px]">
                {/* Multiple Choice */}
                {type !== "Essay" && (
                  <>
                    <input
                      type={type === "Checklist" ? "checkbox" : "radio"}
                      name={`radio-${questionNo}`}
                      className={`${
                        type === "Checklist" ? "checkbox" : "radio"
                      } checked:bg-[#C76650] border-[1px] border-black`}
                      checked={
                        !studentAnswer ||
                        studentAnswer.find(
                          (sa) => sa.answer == choiceObj.choice_text
                        ) !== undefined
                      }
                      disabled
                    />
                    {choiceObj.choice_text}
                  </>
                )}
              </div>
            );
          })}
        {/* Essay */}
        {type === "Essay" && (
          <div>
            <textarea
              className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
              placeholder="Type your Answer Here"
              disabled
              value={studentAnswer[0].answer}
            ></textarea>
            <p className="font-bold">comment</p>
            <textarea
              className="textarea textarea-bordered border-[#BEBEBE] w-full h-[100px]"
              disabled
              value={comment.essay_comment}
            />
          </div>
        )}
      </div>
    </div>
  );
}
