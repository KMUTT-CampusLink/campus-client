export default function Navigation({ hours, minutes, seconds, questionNo, studentQuestion, jumpTo }) {
  const questionsArray = Array.isArray(questionNo) ? questionNo : Array.from({ length: questionNo }, (_, i) => i);
  return (
    <div>
      <div className='flex flex-col justify-around w-[100%]'>
        {/* Timer */}
        <div className="text-[20px] border border-[#BEBEBE] rounded-lg p-[10px] flex flex-col items-center">
          <h2>Time Left</h2>
          <div className={`${minutes < 5 ? "text-red-500" : "text-black"} ${isNaN(hours) || isNaN(minutes) || isNaN(seconds) ? "hidden" : "flex"}`}>
            <h2 className={`${hours === 0 ? "hidden" : "block"}`}>{hours}</h2>
            <div className={`${hours === 0 ? "hidden" : "block"}`}>:</div>
            <h2>{minutes >= 10 ? "" : "0"}{minutes}</h2>
            <h2>:</h2>
            <h2>{seconds >= 10 ? "" : "0"}{seconds}</h2>
          </div>
          <h3 className={`${isNaN(hours) || isNaN(minutes) || isNaN(seconds) ? "flex" : "hidden"}`}>Loading...</h3>
        </div>
        {/* Map Choice Navigation */}
        <div className='w-full xl:w-[200px] flex flex-row flex-wrap justify-center gap-[10px] pt-[20px]'>
          {questionsArray && questionsArray.map((question, index) => (
            <button
              key={index}
              className={`btn ${studentQuestion === index ? "bg-[#ae5e4c] text-white" : ""} border border-[#BEBEBE] w-[60px] hover:bg-[#C76650] hover:text-white hover:border-[#C76650] ease-in duration-100`}
              onClick={() => jumpTo(index)}
            >
              <p className="flex justify-center">
                {index + 1}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
