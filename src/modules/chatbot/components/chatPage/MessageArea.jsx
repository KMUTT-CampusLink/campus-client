import React, { useEffect, useRef } from 'react';
import MessageContainer from './MessageContainer';
import MessageReply from './MessageReply';
import "../../style/style.css";

const MessageArea = ({questions, dummyAns, profilePic, trips, bookdata}) => {

  const messageendref = useRef(null);

  useEffect(() => {
    messageendref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dummyAns, questions]);

  return (
    <div className=' overflow-auto px-10 sm:px-4 lg:px-14 max-h-[19rem] sm:max-h-[16rem] md:max-h-[18rem]'>{
      questions.map((question, i) => {
        return <div key ={i}>
          <div className='flex flex-row-reverse'>
            <MessageContainer question ={question} />
          </div>
          <br/>
          {
            dummyAns[i] ?
            <div className='flex flex-row gap-6'>
              <MessageReply 
              dummyAns = {dummyAns} 
              questions = {questions} 
              answer = {dummyAns[i]} 
              profilePic = {profilePic} 
              trips = {trips} 
              bookdata = {bookdata}/>
            </div>
            : 
            <div className='flex flex-row gap-4 sm:gap-8'>
              <div>
                  <img src={profilePic} alt="astraBot" className='rounded-full w-8 h-auto' />
              </div>
              <div className="chat-bubble bg-white flex justify-center items-center">
                <div className="typing">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          }
          <br/>
          <div ref={messageendref} />
        </div>
      })
    }</div>
  )
}

export default MessageArea