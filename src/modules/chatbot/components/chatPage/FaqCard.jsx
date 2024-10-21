import React from 'react';

const FaqCard = ({faq, startChat, textRef}) => {
  return (
    <div className={`cursor-pointer shadow-slate-600 shadow-md rounded-xl text-left ${startChat? `text-sm sm:text-lg p-[6px] sm:p-[1rem]`: `text-lg sm:text-xl font-semibold p-3 sm:p-6 `}`}
      onClick={() => {textRef.current.value = faq}}>
      {faq}
    </div>
  )
}

export default FaqCard;