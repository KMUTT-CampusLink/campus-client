import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";


const StudentGrid = () => {
  const [students, setStudents] = useState([
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
    },
    {
        "id": 66130500814,
        "firstname": "Aung",
        "middlename": "Min",
        "lastname": "Kyaw",
        "program_id": 6,
        "batch_id": 2,
        "identification_no": "MF234345",
        "gender": "male",
        "date_of_birth": "15-7-2004",
        "phone": 934324533,
        "address": "Yangon Myanmar"
    },
    {
        "id": 66130500815,
        "firstname": "Zin",
        "middlename": "Mar",
        "lastname": "Aung",
        "program_id": 6,
        "batch_id": 2,
        "identification_no": "MF234346",
        "gender": "female",
        "date_of_birth": "28-3-2005",
        "phone": 934324534,
        "address": "Mandalay Myanmar"
    },
    {
        "id": 66130500816,
        "firstname": "Soe",
        "middlename": "Thu",
        "lastname": "Win",
        "program_id": 6,
        "batch_id": 2,
        "identification_no": "MF234347",
        "gender": "male",
        "date_of_birth": "12-12-2003",
        "phone": 934324535,
        "address": "Naypyidaw Myanmar"
    },
    {
        "id": 66130500817,
        "firstname": "Hnin",
        "middlename": "Lae",
        "lastname": "Wai",
        "program_id": 6,
        "batch_id": 2,
        "identification_no": "MF234348",
        "gender": "female",
        "date_of_birth": "10-5-2004",
        "phone": 934324536,
        "address": "Yangon Myanmar"
    },
    {
        "id": 66130500818,
        "firstname": "Nay",
        "middlename": "Thit",
        "lastname": "Zaw",
        "program_id": 6,
        "batch_id": 2,
        "identification_no": "MF234349",
        "gender": "male",
        "date_of_birth": "1-9-2005",
        "phone": 934324537,
        "address": "Bago Myanmar"
    }
]);
  const navigate = useNavigate();

  // Dummy data,replace with API call
//   useEffect(() => {
//     const fetchData = async () =>
//     {
//       const result = await fetch('http://localhost:3000/api/employ/get');
//       const jsonResult = await result.json()
//       //const array = Object.values(jsonResult)
//       setEmployees(jsonResult);
//     }

//     fetchData();
//   }, []);



  const handleClick = () => {
    navigate(`/employ/studentAdd`);
  };
  const handleClickback = () => {
    navigate(`/employ`);
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />
      <main className="pt-16 md:pt-20 px-5 md:px-20 mb-2">

        <div className="border-none flex justify-between mb-2 md:mb-4 px-1 md:px-2">
          <div className="w-1/2 md:space-x-6 space-x-2 flex flex-row items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="hover:shadow-sm md:h-7 " onClick={handleClickback} />
            <input
              className="bg-[#F2F2F2] outline-none transition hover:shadow-md w-3/5 md:w-3/4 text-[12px] md:text-[16px] font-georama  md:h-10 h-7 rounded-lg pl-3 "
              type="text"
              id="search"
              placeholder="Search"
            > </input>
          </div>           
          <button
            onClick={handleClick}
            className=" p-1 border border-black text-[12px] md:text-[16px]  rounded-md shadow-lg hover:shadow-xl transition font-opensans md:h-10 md:w-[140px] w-[105px] flex jusfiy-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1 md:h-5 " />
            New Student
          </button>
        </div>

        <div className="flex justify-center flex-wrap gap-x-7 gap-y-4 sm:gap-7 pt-4 md:pt-6 ">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default StudentGrid;
