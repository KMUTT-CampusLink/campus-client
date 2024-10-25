import { useState } from 'react'

import NavBar from '../../../registration/components/NavBarComponents/NavBar'
import PassedChip from '../../components/professor/Scoring/PassedChip'
import FailedChip from '../../components/professor/Scoring/FailedChip'
import ProcessingChip from '../../components/professor/Scoring/ProcessingChip'
import Question from '../../components/student/ReviewExamPage/Question'

const questionMock = [
  [0, "Multiple Choice", "1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4], [1], ["Correct"]],
  [1, "Checklist", "2Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4], [2, 3], ["False"]],
  [2, "Essay", "3Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [], ["test officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate"], ["False"]],
  [3, "Multiple Choice", "4Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4], [4], ["Correct"]],
];
export default function StudentReviewExamPage() {
  const [permission, setPermission] = useState(1);
  return (
    <>
      <NavBar />
      {/*Heading*/}
      <div className="px-[26px] py-[35px] lg:px-[200px] pt-20">
        <div className='flex justify-between items-center pb-3'>
          <p className='font-bold text-[#D4A015] text-[22px] lg:text-[30px]'>
            Exam 1
          </p>
          <div className='flex flex-col items-end'>
            <PassedChip />
            {/* <FailedChip/> */}
            {/* <ProcessingChip/> */}
            <div className="flex gap-1">
              <p className="text-[22px] lg:text-[30px]">100/100</p>
              {/* <p className="text-[30px]">/</p>
            <p className="text-[30px]">100</p> */}
            </div>
          </div>
        </div>
        <div className={`${permission === 1 ? "block" : "hidden"}`}>
          <hr className='border' />
          <div className="my-10 flex flex-col gap-[20px]">
            {questionMock
              .map((item, index) => (
                <Question
                  key={index}
                  questionNo={item[0]}
                  question={item[2]}
                  choice={item[3]}      // Assuming the choices are at index [3]
                  type={item[1]}
                  studentAnswer={item[4]}
                  isCorrect={item[5]}
                  className="w-[67%] h-auto"
                />
              ))
            }
          </div>
        </div>
        <div className={`${permission === 1 ? "hidden" : "block"} flex w-full h-[80vh] justify-center items-center text-center`}>
          <b>
            The professor does not allow reviewing the exam.
          </b>
        </div>
      </div>
    </>

  )
}
