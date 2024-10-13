import NavBar from "../../../registration/components/NavBar";

export default function StudentExamPasswordPage() {
  return (
    <div className="w-auto">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-[20px]">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#798184] h-[1.5px] flex justify-center" />
        <div className="pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">
            Enter Exam1 Password
          </h3>
          <div className="flex flex-col items-center pt-[50px]">
            <input
              type="text"
              placeholder="Enter Password"
              className="w-[70%] lg:w-[50%] border-2 border-[#798184] rounded-lg p-[10px]"
            />
            <button className="btn w-[200px] mt-[20px] bg-[#7F483C] hover:bg-[#6f4036] text-white">
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
