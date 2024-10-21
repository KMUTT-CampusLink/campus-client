import NavBar from '../../../registration/components/NavBarComponents/NavBar'
import Question from '../../components/student/ExamPage/Question';

const questionMock = [
  [1, "multipleChoice", "1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
  [2, "checkList", "2Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
  [3, "multipleChoice", "3Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis odit commodi doloribus repellat. Incidunt unde, deserunt sapiente id earum officia velit ad aliquid libero, reprehenderit eos et officiis expedita voluptate!", [1, 2, 3, 4]],
];
export default function ProfessorDashboardPage() {
  return (
    <>
      <NavBar />
      <div className="px-[26px] py-[35px] lg:px-[200px] pt-20">
        <p className='font-bold text-[#D4A015] text-[22px] lg:text-[30px] py-4 pb-7'>
          Dashboard
        </p>
        <hr className='border' />
        <div className=" my-10 flex flex-col gap-[50px]">
          <div className='mx-[50px]'>
            <p>Total participant : 20/30</p>
            <p>Min : 1</p>
            <p>Max : 100</p>
            <p>Average : 79</p>
            <p>Passed : 15</p>
            <p>Failed : 5</p>
          </div>
          <div className='flex flex-col gap-[20px]'>
            <p>The most incorrect question :</p>
            {questionMock
              .map((item, index) => (
                <Question
                  key={index}
                  questionNo={item[0]}
                  question={item[2]}
                  choice={item[3]}
                  type={item[1]}
                  className="w-[67%] h-auto"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
