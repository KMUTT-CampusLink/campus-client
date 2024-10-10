import React from 'react';

const FaqCard = ({faq, startChat, textRef}) => {
  return (
    <div className={`cursor-pointer shadow-slate-600 shadow-md rounded-xl text-center ${startChat? `text-sm p-[6px]`: `text-lg font-semibold p-3`}`}
      onClick={() => {textRef.current.value = faq}}>
      {faq}
    </div>
  )
}

export default FaqCard;