export default function Question({
  questionNo,
  question,
  questionImg,
  choice,
  type,
  studentAnswer,
}) {
  return (
    <div className="border border-[#BEBEBE] rounded-xl p-[25px] w-full">
      <h1>{question}</h1>
      {questionImg && <img src={`${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME}/${questionImg}`} alt="" className="w-[300px] h-auto py-[10px]" />}
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
                      className={`radio checked:bg-[#C76650] border-[1px] border-black`}
                      disabled
                    />
                    {choiceObj}
                  </>
                )}
              </div>
            );
          })}
        {/* Essay */}
        {type === "Essay" && (
          <textarea
            className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]"
            placeholder="Type your Answer Here"
            disabled
            value={studentAnswer[0].answer}
          ></textarea>
        )}
      </div>
    </div>
  );
}
