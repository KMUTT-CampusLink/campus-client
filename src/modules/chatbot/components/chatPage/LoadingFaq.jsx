import React from 'react'

const LoadingFaq = () => {
  return (
    <div className=' flex flex-col justify-center items-center py-4 sm:py-6 px-6 w-full h-full gap-4 sm:gap-3'>
        <div className=' w-full h-8 flex flex-row justify-between' >
            <div className='h-full w-[60%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>

            </div>
            <div className='h-full w-[30%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>
                
            </div>
        </div>
        <div className=' w-full h-8 flex flex-row justify-between' >
            <div className='h-full w-[50%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>

            </div>
            <div className='h-full w-[40%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>
                
            </div>
        </div>
        <div className=' w-full h-8 flex flex-row justify-between' >
            <div className='h-full w-[30%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>

            </div>
            <div className='h-full w-[60%] bg-gray-300 rounded-xl '
            style={{backgroundImage: "linear-gradient(to bottom, rgba(252, 219, 165), rgba(248, 248, 248))"}}>
                
            </div>
        </div>
    </div>
  )
}

export default LoadingFaq