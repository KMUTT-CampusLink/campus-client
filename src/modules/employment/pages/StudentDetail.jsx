import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate} from "react-router-dom";
import StudentCard from "../components/StudentCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import SDeletePopUp from "../components/SDeletePopUp";




const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudents] = useState(
    {
      "id": 66130500813,
      "firstname": "Kyaw",
      "middlename": "Nanda",
      "lastname": "Thu",
      "program_id": 6,
      "batch_id": 2,
      "identification_no": "MF234344",
      "gender": "male",
      "date_of_birth": "20-4-2004",
      "phone": 934324532,
      "address": "Yangon Myanmar"
      }
  );
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  const handleClickback = () => {
    navigate(`/employ/student`);
  };
  const handleClick = () => {
    navigate(`/employ/studentUpdate/${student.id}`);
  };
  const handleDeleteClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-16 md:pt-20 px-4 md:px-20">
        <FontAwesomeIcon icon={faArrowLeft} className="hover:shadow-sm md:h-7" onClick={handleClickback} />
        <div className="lg:flex lg:justify-around lg:items-center"> 
          <div className="flex justify-center">
            <StudentCard student={student} />
          </div>

          <article className="pt-5 text-[#7F483C] lg:px-3">
            <h2 className=" text-[15px] text-black md:text-[20px] font-geologica mb-3">
              Student Information
            </h2>

            <div className="border lg:w-[700px] xl:w-[900px] 2xl:w-[1200px] border-[#939393] rounded-md grid grid-cols-1 lg:grid-cols-2  lg:divide-x divide-[#939393] ">
              {/* Left Side */}
              <div className="p-5 space-y-2 md:space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Student-ID</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.id}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Name</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.firstname} {student.midname} {student.lastname}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Program</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.program_id}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Batch</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.batch_id}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Identification</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.identification_no}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Age</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.date_of_birth}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Gender</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.gender}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Contact</p>
                  <p className="text-[15px] md:text-[20px] font-georama">{student.phone}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Address</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.address}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
          <button className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm" onClick={handleClick}>Edit</button>
          <button type="button" className="bg-[#EC5A51] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm" onClick={handleDeleteClick}>Delete</button>
        </div>
      </main>

      {showPopup && <SDeletePopUp  onClose={handleClosePopup} />}

    </div>
  );
};

export default StudentDetail;