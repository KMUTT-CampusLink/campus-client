import React from 'react'

const MessageContainer = ({question}) => {
  return (
    <div className="shadow-sm min-w-[2rem] max-w-fit bg-[white] rounded-2xl sm:rounded-3xl h-fit py-3 px-4">
      {question}
    </div>
  )
}

export default MessageContainer