import React from 'react';

const FaqCard = ({faq, startChat, textRef, setButtonAble}) => {
  return (
    <div className={`cursor-pointer border text-left ${startChat? `text-xs p-[6px] sm:p-[10px] rounded-xl sm:rounded-2xl`: `text-sm lg:text-base font-semibold px-2 py-[0.3rem] md:p-2 lg:px-4 lg:py-2 rounded-2xl sm:rounded-3xl`}`} style={{borderColor : "rgba(134, 78, 65, 1)"}}
      onClick={() => {textRef.current.value = faq; setButtonAble(true); }}>
      {faq}
    </div>
  )
}

export default FaqCard;