export default function StudentQuestion({ questionid, questionNo, question, questionImg, choice, type }) {
  return (
    <div className="border rounded-xl p-[25px] w-full">
      <h1>{questionNo + 1}. {question}</h1>
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {questionImg && <img src={`${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}/${questionImg}`} alt="" className="w-[300px] h-auto mb-[10px]" />}
        {choice.map((choiceObj, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* Multiple Choice */}
            {type === 'Multiple Choice' && (
              <>
                <input
                  type="radio"
                  name={`radio-${questionNo}`}
                  className={`radio checked:bg-[#C76650] border-black`}
                  disabled
                />
                {choiceObj.choiceText ? choiceObj.choiceText : choiceObj}
              </>
            )}
            {/* Checklist */}
            {type === 'Checklist' && (
              <>
                <input
                  type="checkbox"
                  className={`checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]`}
                  disabled
                />
                {choiceObj.choiceText ? choiceObj.choiceText : choiceObj}
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
          ></textarea>
        )}
      </div>
    </div>
  );
}
