export default function Navigation({ questionNo, studentQuestion, jumpTo }) {
  return (
    <div>
      <div className='flex flex-col justify-around w-[100%]'>
        {/* Timer */}
        <div className=" text-[20px] border border-[#BEBEBE] rounded-lg p-[10px] flex flex-col items-center">
          <h2 className="">Time Left</h2>
          <h2>12:00</h2>
        </div>
        {/* Map Choice Navigation */}
        <div className='w-full xl:w-[200px] flex flex-row flex-wrap justify-center gap-[10px] pt-[20px]'>
          {questionNo.map((question, index) => (
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