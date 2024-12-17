import React from 'react';
import TripList from '../../../transportation/components/ScheduleList';
import Booking from '../LibraryBooking/Booking';

const MessageReply = ({dummyAns, questions, answer, profilePic, trips, bookdata}) => {
  return (
    <>  
        {/* profile  */}
        <div>
            <img src={profilePic} alt="astraBot" className='rounded-full w-8 h-auto' />
        </div>
        {/* reply message display */}
          {
            answer === "trip" ?
              <div className='w-full h-full flex flex-col'>
              <p>You can book one of the following trip. <b>By clicking "Book Now", you will be redirected to booking page 
                to get your QR which you need to use to be checked by the bus driver.</b></p>
              <TripList 
                trips={trips}
              />
              </div>
            : answer.trim() === "book" && bookdata ?
              <div className='w-full h-full flex flex-col'>
                <p>The book <strong>"{bookdata.title}"</strong>, edition {bookdata.edition} written by <strong>{bookdata.author}</strong> is available at the library.
                  <br />
                  <strong>Description:</strong> {bookdata.description} <br />
                  <span className='w-full h-full self-center justify-center text-center'><b>If you want to reserve the book, click below.</b></span>
                </p>
                <Booking bookdata={bookdata}/>
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