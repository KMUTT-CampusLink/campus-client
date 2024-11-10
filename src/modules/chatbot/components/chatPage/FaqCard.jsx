import React from 'react';

const FaqCard = ({faq, startChat, textRef, setButtonAble}) => {
  return (
    <div className={`cursor-pointer border text-left ${startChat? `text-xs p-[6px] sm:p-[10px] rounded-xl sm:rounded-2xl`: `text-sm lg:text-base font-semibold p-2 md:p-3 lg:p-4 rounded-2xl sm:rounded-3xl`}`} style={{borderColor : "rgba(134, 78, 65, 1)"}}
      onClick={() => {textRef.current.value = faq; setButtonAble(true); }}>
      {faq}
    </div>
  )
}

export default FaqCard;