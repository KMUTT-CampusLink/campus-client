import React from 'react';

const MessageReply = ({answer, profilePic}) => {
  return (
    <>  
        {/* profile  */}
        <div>
            <img src={profilePic} alt="astraBot" className='rounded-full w-10 h-auto' />
        </div>
        {/* reply message display */}
        <div className='max-w-[20rem] sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[45rem] p-1'>
            {answer}
        </div>
    </>
  )
}

export default MessageReply;