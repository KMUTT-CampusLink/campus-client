import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import EmployeeCard from "../components/EmployeeCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";


const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Dummy data,replace with API call
  useEffect(() => {
    const fetchData = async () =>
    {
      const result = await fetch('http://localhost:3000/api/employ/get');
      const jsonResult = await result.json()
      //const array = Object.values(jsonResult)
      setEmployees(jsonResult);
    }

    fetchData();
  }, []);



  const handleClick = () => {
    navigate(`/employ/employeeAdd`);
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />
      <main className="pt-16 md:pt-20 px-3 md:px-20 mb-2">

        <div className="border-none flex justify-between mb-2 md:mb-4">
          <input
            className="bg-[#F2F2F2] outline-none transition hover:shadow-sm w-2/5 text-[12px] md:text-[16px] font-georama  md:h-10 h-7 rounded-lg pl-3 "
            type="text"
            id="search"
            placeholder="search"
          ></input>
          <button
            onClick={handleClick}
            className="p-1 border border-black text-[12px] md:text-[16px]  rounded-md shadow-lg hover:shadow-xl transition font-opensans md:h-10 flex jusfiy-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mx-2 md:h-5 " />
            New Employee
          </button>
        </div>

        <div className="flex justify-center flex-wrap gap-x-7 gap-y-4 sm:gap-7">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default EmployeeGrid;
