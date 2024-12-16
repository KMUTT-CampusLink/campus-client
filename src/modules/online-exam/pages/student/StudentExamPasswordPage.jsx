import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import BackBTN from "../../components/BackBTN";

import { verifyExamPassword, getExamTitle } from "../../services/apis/studentApi";

export default function StudentExamPasswordPage() {
  const [password, setPassword] = useState("");
  const [title, setExamTitle] = useState("");
  const [description, setExamDescription] = useState("");
  const { examId } = useParams();
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlePassword = async () => {
    const res = await verifyExamPassword(examId, password);
    if (res.status === 200) {
      navigate(`/exams/student/exam/${examId}`);
    } else {
      setAlertVisible(true);
      setAlertMessage("Password is incorrect");
      setTimeout(() => {
        setAlertMessage("");
        setAlertVisible(false);
      }, 3000);
    }
  };


  const getTitle = async () => {
    const res = await getExamTitle(examId);
    setExamTitle(res.data.data.title);
    setExamDescription(res.data.data.description);
  }

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <>
      <NavBar />
      <div className="mx-[35px] xl:mx-[100px] pt-20">
          <BackBTN />
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
            <b className="pt-[20px] text-red-500 text-center flex justify-center">*** CAUTION : Please avoid SWITCHING TAB during the exam, as we won’t be able to save your answers to prevent cheating. ***</b>
          </div>
        </div>
      </div>
      {alertVisible && (
        <div className="toast toast-center">
          <div className={`alert alert-error transition-opacity duration-300 ease-in ${alertVisible ? "opacity-100" : "opacity-0"}`}>
            <p className="text-white">{alertMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
