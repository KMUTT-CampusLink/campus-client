import { useState, useEffect } from 'react';

export default function Question({ questionid, questionNo, question, questionImg, choice, type, handleAnswer, studentAnswer }) {
  const [localAnswer, setLocalAnswer] = useState(studentAnswer || []);
  useEffect(() => {
    setLocalAnswer(studentAnswer);
  }, [studentAnswer]);

  const handleInputChange = (choiceObj) => {
    if (type === 'Multiple Choice') {
      setLocalAnswer([choiceObj]);
    } else if (type === 'Checklist') {
      setLocalAnswer((prevAnswers) => {
        const isSelected = prevAnswers.some(answer => answer.choiceId === choiceObj.choiceId);
        if (isSelected) {
          return prevAnswers.filter(answer => answer.choiceId !== choiceObj.choiceId); // Remove if already selected
        } else {
          return [...prevAnswers, choiceObj];
        }
      });
    } else if (type === 'Essay') {
      setLocalAnswer([{ question_id: questionid, choiceText: choiceObj, choiceId: '' }]); // Wrap essay text in object format
    }
  };

  useEffect(() => {
    handleAnswer(questionNo, localAnswer);
  }, [localAnswer]);

  const isSelected = (value) => {
    return localAnswer.some(answer => answer.choiceText === value) ? true : false;
  };

  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[25px] w-full">
      <h1>{questionNo + 1}. {question}</h1>
      {questionImg && <img src={`${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}/${questionImg}`} alt="" className="w-[300px] h-auto mb-[10px]" />}
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {choice.map((choiceObj, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* Multiple Choice */}
            {type === 'Multiple Choice' && (
              <>
                <input
                  type="radio"
                  name={`radio-${questionNo}`}
                  className={`radio checked:bg-[#C76650]`}
                  checked={isSelected(choiceObj.choiceText)}
                  onChange={() => handleInputChange(choiceObj)}
                />
                {choiceObj.choiceText}
              </>
            )}
            {/* Checklist */}
            {type === 'Checklist' && (
              <>
                <input
                  type="checkbox"
                  className={`checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]`}
                  checked={isSelected(choiceObj.choiceText)}
                  onChange={() => handleInputChange(choiceObj)}
                />
                {choiceObj.choiceText}
              </>
            )}
          </div>
        ))}
        {/* Essay */}
        {type === 'Essay' && (
          <textarea
            className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
            placeholder="Type your Answer Here"
            value={localAnswer[0]?.choiceText || ''}
            onChange={(e) => handleInputChange(e.target.value)}
          ></textarea>
        )}
      </div>
    </div>
  );
}
