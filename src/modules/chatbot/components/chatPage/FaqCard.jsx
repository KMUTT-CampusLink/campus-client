import React from 'react';

const FaqCard = ({faq, startChat, textRef, setButtonAble}) => {
  return (
    <div className={`cursor-pointer shadow-slate-600 border rounded-xl text-left ${startChat? `text-sm p-[6px] sm:p-[10px]`: `text-lg font-semibold p-3 sm:p-4 `}`}
      onClick={() => {textRef.current.value = faq; setButtonAble(true); }}>
      {faq}
    </div>
  )
}

export default FaqCard;