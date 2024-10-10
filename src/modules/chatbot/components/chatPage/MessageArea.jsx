import React, { useEffect, useRef } from 'react';
import MessageContainer from './MessageContainer';
import MessageReply from './MessageReply';

const MessageArea = ({messagesInd, dummyFaqs, dummyAns, profilePic}) => {

  const messageendref = useRef(null);

  useEffect(() => {
    messageendref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesInd]);

  return (
    <div className='overflow-auto px-10 max-h-[20rem]'>{
      messagesInd.map((index, i) => {
        return <div key ={i}>
          <div className='flex flex-row-reverse'>
            <MessageContainer question ={dummyFaqs[index]} />
          </div>
          <br />
          <div className='flex flex-row gap-6'>
            <MessageReply answer = {dummyAns[index]} profilePic = {profilePic} />
          </div>
          <br/>
          <div ref={messageendref} />
        </div>
      })
    }</div>
  )
}

export default MessageArea