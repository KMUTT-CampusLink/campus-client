import React from 'react'
import FaqCard from './FaqCard'

const FAQs = ({dummyFaqs, startChat, textRef}) => {
  return (
    <div className={`max-w-[30rem] h-full flex flex-row gap-4 flex-wrap justify-start items-center`}>
        {dummyFaqs.map((faq, index) => {
          return <FaqCard key = {index} textRef = {textRef} faq = {faq} startChat = {startChat}/>
        })}
    </div>
  )
}

export default FAQs