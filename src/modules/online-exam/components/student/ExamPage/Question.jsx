import React from 'react'

export default function Question({ questionNo, question, choice, type }) {
  return (
    <div className='border border-[#BEBEBE] rounded-xl p-[25px] w-full'>
      {/* Question */}
      <h1>{questionNo}. {question}</h1>
      <div className='flex flex-col gap-[10px] pt-[20px]'>
        {choice.map((choice, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            {/* Multiple Choice form */}
            {type === 'multipleChoice' && (
              <>
                <input type="radio" name="radio-10" className="radio checked:bg-[#C76650]" />
                {choice}
              </>
            )}
            {/* Check List form */}
            {type === 'checkList' && (
              <>
                <input type="checkbox" className="checkbox [--chkbg:#C76650] [--chkfg:white] checked:border-[#C76650]" />
                {choice}
              </>
            )}
          </div>
        ))}
        {/* Essay form */}
        {type === 'essay' && (
          <>
            <textarea className="textarea textarea-bordered border-[#BEBEBE] w-full h-[220px]" placeholder="Type your Answer Here"></textarea>
          </>
        )}
      </div>
    </div>
  )
}
