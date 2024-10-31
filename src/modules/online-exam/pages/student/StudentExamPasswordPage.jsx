import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";

import { verifyExamPassword, getExamTitle } from "../../services/apis/studentApi";

export default function StudentExamPasswordPage() {
  const [password, setPassword] = useState("");
  const [title, setExamTitle] = useState("");
  const [description, setExamDescription] = useState("");
  const { examId } = useParams();
  const navigate = useNavigate();

  const handlePassword = async () => {
    const res = await verifyExamPassword(examId, password);
    if (res.status === 200) {
      navigate(`/exams/student/exam/${examId}`);
    } else {
      alert("Password is incorrect");
    }
  }

  const getTitle = async () => {
    const res = await getExamTitle(examId);
    setExamTitle(res.data.data.title);
    setExamDescription(res.data.data.description);
  }

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
        <h2 className="font-black text-[25px] xl:text-[40px] text-[#D4A015]">
          {title}
        </h2>
        <hr className="mt-[20px] bg-[#798184] h-[1.5px] flex justify-center" />
        <div className="pt-[20px]">
          <h3 className="font-bold text-[22px] xl:text-[30px]">Description</h3>
          <h4 className="py-[10px]">
            {description}
          </h4>
          <h3 className="font-bold text-[22px] xl:text-[30px]">
            Enter PIN
          </h3>
          <div className="flex flex-col items-center pt-[50px]">
            <input
              type="text"
              placeholder="Enter PIN"
              className="w-[70%] lg:w-[50%] border-2 border-[#798184] rounded-lg p-[10px]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn w-[200px] mt-[20px] bg-[#7F483C] hover:bg-[#6f4036] text-white" onClick={handlePassword}>
              Enter
            </button>
            <b className="pt-[20px] text-red-500">*** CAUTION : Don't SWITCH TAB while doing the Exam ***</b>
          </div>
        </div>
      </div>
    </div>
  );
}
