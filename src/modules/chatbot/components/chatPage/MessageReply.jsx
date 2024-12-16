import React from 'react';

const MessageReply = ({dummyAns, questions, answer, profilePic}) => {
  return (
    <>  
        {/* profile  */}
        <div>
            <img src={profilePic} alt="astraBot" className='rounded-full w-8 h-auto' />
        </div>
        {/* reply message display */}
          <div className=' max-w-[22rem] sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[45rem] xl:max-w-[50rem] p-1'>
            <pre className='font-opensans text-sm lg:text-base max-w-full whitespace-pre-wrap '>{answer}</pre>
          </div>
    </>
  )
}

export default MessageReply;