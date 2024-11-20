import { useEffect, useState } from "react";

import {
  getQuestionScore,
  getStudentScoreById,
} from "../../../services/apis/professerApi";

export default function StudentQuestion({
  studentId,
  essayScore,
  setEssayScore,
  setEssayComment,
  studentAnswer,
  questionid,
  questionNo,
  question,
  choice,
  type,
}) {
  const [maxScore, setMaxScore] = useState(0);
  const [studentScore, setStudentScore] = useState(0);
  const [haveScore, setHaveScore] = useState(false);
  const setStudentEssayScore = (e) => {
    const score = e.target.value;
    if (score >= 0 && score <= maxScore) {
      setEssayScore((prevEssayScore) => {
        const updatedScoring = prevEssayScore.scoring.filter(
          (item) => item.question_id !== questionid
        );
        updatedScoring.push({ question_id: questionid, score: score });
        return {
          ...prevEssayScore,
          scoring: updatedScoring,
        };
      });
    }
  };
  const setComment = (e) => {
    const comment = e.target.value;
    setEssayComment((prevEssayComment) => {
      const updatedComment = prevEssayComment.comment.filter(
        (item) => item.question_id !== questionid
      );
      updatedComment.push({ question_id: questionid, comment: comment });
      return {
        ...prevEssayComment,
        comment: updatedComment,
      };
    });
  };


  // const updateEssayComment = (e) => {
  //   const comment = e.target.value;
  //   studentAnswer((prevEssayScore) => {
  //     const updatedScoring = prevEssayScore.scoring.map((item) =>
  //       item.question_id === questionid
  //         ? { ...item, essay_comment: comment }
  //         : item
  //     );
  //     return {
  //       ...prevEssayScore,
  //       scoring: updatedScoring,
  //     };
  //   });
  // };

  const isAnswer = (choiceObj) => {
    return studentAnswer.some(
      (answer) =>
        answer.question_id === choiceObj.question_id &&
        answer.answer === choiceObj.choiceText
    );
  };

  const isEssayAnswer = () => {
    const essayAnswer = studentAnswer.find(
      (answer) => answer.question_id === questionid
    );
    return essayAnswer ? essayAnswer.answer : "";
  };

  const isComment = () => {
    const comment = studentAnswer.find(
      (essay) => essay.question_id === questionid
    );
    return comment ? comment.essay_comment : "";
  };

  const isCommentDisabled = () => {
    const comment = studentAnswer.find(
      (essay) => essay.question_id === questionid
    );
    return comment && comment.essay_comment !== null;
  };
  const getScore = async () => {
    try {
      const response = await getStudentScoreById(questionid, studentId);
      setHaveScore(response.data ? true : false);
      setStudentScore(response.data ? response.data : 0);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxScore = async () => {
    try {
      const response = await getQuestionScore(questionid);
      setMaxScore(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getScore();
    getMaxScore();
  }, [questionid]);

  return (
    <div className="border rounded-xl p-[25px] w-full">
      <h1>
        {questionNo + 1}. {question}
      </h1>
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {choice.map((choiceObj, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* Multiple Choice */}
            {type === "Multiple Choice" && (
              <>
                <input
                  type="radio"
                  name={`radio-${questionNo}`}
                  className="radio checked:bg-[#C76650] border-black"
                  checked={isAnswer(choiceObj)}
                  disabled
                />
                {choiceObj.choiceText ? choiceObj.choiceText : choiceObj}
              </>
            )}
            {/* Checklist */}
            {type === "Checklist" && (
              <>
                <input
                  type="checkbox"
                  className={`checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]`}
                  checked={isAnswer(choiceObj)}
                  disabled
                />
                {choiceObj.choiceText ? choiceObj.choiceText : choiceObj}
              </>
            )}
          </div>
        ))}
        <h2
          className={`text-[16px] pt-[10px] ${
            type === "Essay" ? "hidden" : "flex"
          }`}
        >
          Score : {studentScore}/{maxScore}
        </h2>
        {/* Essay */}
        {type === "Essay" && (
          <>
            <textarea
              className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
              value={isEssayAnswer()}
              disabled
            />
            <div className="flex items-center pt-[10px]">
              <h2 className="text-[16px]">Score :</h2>
              <input
                className={`input input-bordered w-[55px] h-[40px] ml-[10px] text-center ${
                  haveScore ? "hidden" : ""
                }`}
                value={
                  essayScore.scoring.find(
                    (item) => item.question_id === questionid
                  )?.score || ""
                }
                onChange={setStudentEssayScore}
              />
              <h2 className="text-[16px] pl-[5px]">
                {haveScore ? studentScore : null}/{maxScore}
              </h2>
            </div>
            <p className="font-bold">comment</p>
            <textarea
              className="textarea textarea-bordered border-[#BEBEBE] w-full h-[100px]"
              value={isComment()}
              onChange={setComment}
              disabled={isCommentDisabled()}
            />
          </>
        )}
      </div>
    </div>
  );
}
