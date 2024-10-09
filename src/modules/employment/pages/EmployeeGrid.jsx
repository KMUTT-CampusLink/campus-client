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
    setEmployees([
      {
        id: "66130500811",
        name: "Koe Koe",
        department: "Eng",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500812",
        name: "kiaer",
        department: "SIT",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500813",
        name: "bfejwi",
        department: "SCI",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500814",
        name: "csfew",
        department: "IES",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500816",
        name: "dewfe",
        department: "FIES",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500817",
        name: "Koese",
        department: "DFX",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500818",
        name: "wfadf",
        department: "DFIE",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500819",
        name: "ewfds",
        department: "DXSI",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500820",
        name: "DEgsaef",
        department: "DFCIE",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
      {
        id: "66130500821",
        name: "ewadfa",
        department: "dESD",
        jobTitle: "HR Management",
        position: "Senior Consultant",
        address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
        contactNo: "09xxxxxxxxxx",
        salary: "50000$",
        degree: "High School Diploma",
        startDate: "Jan 2020",
      },
    ]);
  }, []);

  const handleClick = () => {
    navigate(`/employ/employadd`);
  };

  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <main className="pt-20 px-4 md:px-20">

        <div className="border-none mb-6 flex justify-between">
          <input
            className="bg-[#F2F2F2] outline-none transition hover:shadow-sm w-2/5 text-[12px] md:text-[16px] font-georama  md:h-10 h-7 rounded-lg pl-3 "
            type="text"
            id="search"
            placeholder="search by Id"
          ></input>
          <button
            onClick={handleClick}
            className="p-1 border border-black text-[12px] md:text-[16px]  rounded-md shadow-lg hover:shadow-xl transition font-opensans md:h-10"
          >
            <FontAwesomeIcon icon={faPlus} className="mx-2" />
            New Employee
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default EmployeeGrid;
