import NavBar from "../../../registration/components/NavBar";
import ExamCard from "../../components/student/HomePage/ExamCard";

const dataMock = ["asd1", "asd2", "asd3", "asd4", "asd5"];

export default function StudentHomePage() {
  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-[20px]">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#798184] flex justify-center" />
        <div className=" flex justify-between pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">
            Examination
          </h3>
        </div>
        <div className="grid gap-4 py-[20px]">
          {dataMock.map((examName) => (
            <ExamCard examName={examName}></ExamCard>
          ))}
        </div>
      </div>
    </div>
  )
}