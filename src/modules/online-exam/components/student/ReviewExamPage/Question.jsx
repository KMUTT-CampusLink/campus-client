export default function Question({ questionNo, question, choice, type, studentAnswer, isCorrect }) {
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[25px] w-full">
      <h1>{questionNo + 1}. {question}</h1>
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {choice && choice.map((choiceObj, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* Multiple Choice */}
            {type === 'Multiple Choice' && (
              <>
                <input
                  type="radio"
                  name={`radio-${questionNo}`}
                  className={`radio checked:bg-[#C76650]`}
                  checked={choiceObj == studentAnswer}
                  disabled
                />
                {choiceObj}
              </>
            )}
            {/* Checklist */}
            {type === 'Checklist' && (
              <>
                <input
                  type="checkbox"
                  className={`checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]`}
                  checked={studentAnswer.includes(choiceObj)}
                  disabled
                />
                {choiceObj}
              </>
            )}
          </div>
        ))}
        {/* Essay */}
        {type === 'Essay' && (
          <textarea
            className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
            placeholder="Type your Answer Here"
            disabled
            value={studentAnswer}
          ></textarea>
        )}
      </div>
    </div>
  );
}
