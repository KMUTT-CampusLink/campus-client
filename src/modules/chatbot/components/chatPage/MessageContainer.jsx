import React from 'react'

const MessageContainer = ({question}) => {
  return (
    <div className="shadow-sm min-w-[2rem] max-w-fit bg-[white] text-sm lg:text-base font-semibold rounded-2xl sm:rounded-3xl h-fit px-3 md:px-4 py-2 md:py-3">
      {question}
    </div>
  )
}

export default MessageContainer