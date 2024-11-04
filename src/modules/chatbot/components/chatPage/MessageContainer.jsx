import React from 'react'

const MessageContainer = ({question}) => {
  return (
    <div className="shadow-sm min-w-[2rem] max-w-fit bg-[#D9D9D9] rounded-2xl h-fit py-3 px-4">
      {question}
    </div>
  )
}

export default MessageContainer