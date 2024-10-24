import { useState, useEffect } from 'react';

export default function Question({ questionNo, question, choice, type, handleAnswer, studentAnswer }) {
  const [localAnswer, setLocalAnswer] = useState(studentAnswer || []);

  useEffect(() => {
    setLocalAnswer(studentAnswer);
  }, [studentAnswer]);

  const handleInputChange = (value) => {
    if (type === 'multipleChoice') {
      setLocalAnswer([value]); // Only one answer for multiple choice
    } else if (type === 'checkList') {
      setLocalAnswer((prevAnswers) => {
        if (prevAnswers.includes(value)) {
          return prevAnswers.filter((answer) => answer !== value); // Uncheck if already selected
        } else {
          return [...prevAnswers, value]; // Add to answers
        }
      });
    } else if (type === 'essay') {
      setLocalAnswer([value]); // essay answer
    }
  };

  useEffect(() => {
    handleAnswer(questionNo, localAnswer);
  }, [localAnswer]);

  // function to check if a choice is selected
  const isSelected = (value) => {
    return localAnswer.includes(value) ? "checked" : "";
  };

  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[25px] w-full">
      <h1>{questionNo}. {question}</h1>
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {choice.map((choiceText, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* multipleChoice */}
            {type === 'multipleChoice' && (
              <>
                <input
                  type="radio"
                  name={`radio-${questionNo}`}
                  className={`radio checked:bg-[#C76650]`}
                  checked={isSelected(choiceText)}
                  onChange={() => handleInputChange(choiceText)}
                />
                {choiceText}
              </>
            )}
            {/* checkList */}
            {type === 'checkList' && (
              <>
                <input
                  type="checkbox"
                  className={`checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]`}
                  checked={isSelected(choiceText)}
                  onChange={() => handleInputChange(choiceText)}
                />
                {choiceText}
              </>
            )}
          </div>
        ))}
        {/* essay */}
        {type === 'essay' && (
          <textarea
            className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
            placeholder="Type your Answer Here"
            value={localAnswer[0] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
          ></textarea>
        )}
      </div>
    </div>
  );
}
