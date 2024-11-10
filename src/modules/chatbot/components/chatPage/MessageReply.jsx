import React from 'react';
import "../../style/style.css";

const MessageReply = ({dummyAns, questions, answer, profilePic}) => {
  return (
    <>  
        {/* profile  */}
        <div>
            <img src={profilePic} alt="astraBot" className='rounded-full w-8 h-auto' />
        </div>
        {/* reply message display */}
        {dummyAns.length < questions.length ? 
          <div>
            <div className="flex items-center justify-between relative w-[2rem] sm:[3rem] ">
              <div className="📦 w-1 sm:w-2 h-1 sm:h-2 rounded-[1px] sm:rounded-sm "></div>
              <div className="📦 w-1 sm:w-2 h-1 sm:h-2 rounded-[1px] sm:rounded-sm"></div>
              <div className="📦 w-1 sm:w-2 h-1 sm:h-2 rounded-[1px] sm:rounded-sm"></div>
              <div className="📦 w-1 sm:w-2 h-1 sm:h-2 rounded-[1px] sm:rounded-sm"></div>
              <div className="📦 w-1 sm:w-2 h-1 sm:h-2 rounded-[1px] sm:rounded-sm"></div>
            </div>
          </div> 
          : 
          <div className=' max-w-[22rem] sm:max-w-[25rem] md:max-w-[30rem] p-1'>
            <pre className='font-opensans text-sm lg:text-md max-w-full whitespace-pre-wrap '>{answer}</pre>
          </div>
        }
    </>
  )
}

export default MessageReply;