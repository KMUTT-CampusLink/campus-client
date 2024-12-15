import React from 'react'
import FaqCard from './FaqCard'

const FAQs = ({dummyFaqs, startChat, textRef, setButtonAble}) => {
  return (
    <div className={` ${startChat ? ``: `mt-0`} sm:my-1 h-full flex flex-row gap-2 flex-wrap justify-start items-center`}>
        {dummyFaqs.map((faq, index) => {
          return <FaqCard key = {index} textRef = {textRef} faq = {faq} startChat = {startChat} setButtonAble = {setButtonAble}/>
        })}
    </div>
  )
}

export default FAQs