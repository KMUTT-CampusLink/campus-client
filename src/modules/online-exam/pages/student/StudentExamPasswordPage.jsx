import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";

import { verifyExamPassword } from "../../services/apis/studentApi";

export default function StudentExamPasswordPage() {
  const [password, setPassword] = useState("");
  const { examId } = useParams();
  const navigate = useNavigate();

  const handlePassword = async () => {
    const res = await verifyExamPassword(examId, password);
    console.log(res)
    if (res.status === 200){
      navigate(`/exams/student/exam/${examId}`);
    }else{
      alert("Password is incorrect");
    }
  }

  return (
    <div className="">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          Linear Algebra
        </h2>
        <hr className="mt-[20px] bg-[#798184] h-[1.5px] flex justify-center" />
        <div className="pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">
            Enter Password
          </h3>
          <div className="flex flex-col items-center pt-[50px]">
            <input
              type="text"
              placeholder="Enter Password"
              className="w-[70%] lg:w-[50%] border-2 border-[#798184] rounded-lg p-[10px]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn w-[200px] mt-[20px] bg-[#7F483C] hover:bg-[#6f4036] text-white" onClick={handlePassword}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
