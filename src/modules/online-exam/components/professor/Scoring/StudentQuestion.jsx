export default function StudentQuestion({
  studentAnswer,
  questionid,
  questionNo,
  question,
  choice,
  type,
}) {
  const isAnswer = (choiceObj) => {
    for (let i = 0; i < studentAnswer.length; i++) {
      if (
        studentAnswer[i].question_id == choiceObj.question_id &&
        studentAnswer[i].answer == choiceObj.choiceText
      ) {
        return true;
      }
    }
  };

  const isEssayAnswer = () => {
    for (let i = 0; i < studentAnswer.length; i++) {
      if (studentAnswer[i].question_id == questionid) {
        return studentAnswer[i].answer;
      }
    }
  };

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
        {/* Essay */}
        {type === "Essay" && (
          <>
            <textarea
              className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
              value={isEssayAnswer()}
              disabled
            />
            <div className="flex items-center pt-[20px]">
              <h2 className="text-[16px]">Score :</h2>
              <input class="input input-bordered w-[55px] h-[40px] ml-[10px] text-center"></input>
              <h2 className="text-[16px] pl-[10px]">/{10}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
