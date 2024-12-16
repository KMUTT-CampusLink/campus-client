import React from 'react';
import TripList from '../../../transportation/components/ScheduleList';

const MessageReply = ({dummyAns, questions, answer, profilePic, trips}) => {
  return (
    <>  
        {/* profile  */}
        <div>
            <img src={profilePic} alt="astraBot" className='rounded-full w-8 h-auto' />
        </div>
        {/* reply message display */}
          {
            answer === "-" ?
              <div className='w-full h-full flex flex-col'>
              <p>You can book one of the following trip. <b>By clicking "Book Now", you will be redirected to booking page 
                to get your QR which you need to use to be checked by the bus driver.</b></p>
              <TripList 
                trips={trips}
              />
              </div>
            :
              <div className=' max-w-[22rem] sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[45rem] xl:max-w-[50rem] p-1'>
                <pre className='font-opensans text-sm lg:text-base max-w-full whitespace-pre-wrap '>{answer}</pre>
              </div>
          }
    </>
  )
}

export default MessageReply;