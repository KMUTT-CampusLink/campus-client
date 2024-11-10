import React, { useEffect, useRef } from 'react';
import MessageContainer from './MessageContainer';
import MessageReply from './MessageReply';

const MessageArea = ({questions, dummyAns, profilePic}) => {

  const messageendref = useRef(null);

  useEffect(() => {
    messageendref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dummyAns]);

  return (
    <div className=' overflow-auto px-10 sm:px-4 lg:px-14 max-h-[19rem] sm:max-h-[16rem] md:max-h-[20rem] xl:max-h-[22rem]'>{
      questions.map((question, i) => {
        return <div key ={i}>
          <div className='flex flex-row-reverse'>
            <MessageContainer question ={question} />
          </div>
          <br />
          <div className='flex flex-row gap-6'>
            <MessageReply dummyAns = {dummyAns} questions = {questions} answer = {dummyAns[i]} profilePic = {profilePic} />
          </div>
          <br/>
          <div ref={messageendref} />
        </div>
      })
    }</div>
  )
}

export default MessageArea