import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import dummydata from "./employee.json"

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Dummy data fetch - replace with actual API call
  useEffect(() => {
    const fetchEmployee = async () => {
      const data = dummydata;

      const emp = data.find((emp) => emp.id == id);
      setEmployee(emp);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  const handleClickback = () => {
    navigate(`/employ`);
  };

  const handleClick = () => {
    navigate(`/employ/employupdate`);
  };

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      <main className="pt-20 px-4 md:px-20">
      <FontAwesomeIcon icon={faArrowLeft} className="hover:shadow-sm md:h-7" onClick={handleClickback}/>
        <body className="lg:flex items-center justify-between xl:justify-around">
          <div className="flex justify-center">
            <EmployeeCard  employee={employee} />
          </div>
          
          <article className="pt-5 text-[#7F483C] lg:px-3">
            <h2 className=" text-[15px] text-black md:text-[20px] font-geologica mb-3">
              Work History
            </h2>
            
            <div className="border rounded-md grid grid-cols-1 lg:grid-cols-2 divide-x ">
              {/* Left Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Employee-ID</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.id}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Name</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.name}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Department</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.department}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Job-title</p>
                  <p className="text-[15px] md:text-[20px] font-georama">{employee.jobTitle}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Position</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.position}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Salary</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                  {employee.salary}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Gender</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                  {employee.gender}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Age</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                  {employee.age}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Identification</p>
                  <p className="text-[15px] md:text-[20px] font-georama">{employee.identification}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Contact</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                  {employee.contactNo}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px]">Address</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                  {employee.address}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </body>

        <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
          <button className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm" onClick={handleClick}>Edit</button>
          <button className="bg-red-500 text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Delete</button>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDetail;
