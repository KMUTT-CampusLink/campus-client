import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Dummy data fetch - replace with actual API call
  useEffect(() => {
    const fetchEmployee = async () => {
      const data = [
        {
          id: "66130500811",
          name: "Koe Koe",
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
          id: "66130500814",
          name: "csfew",
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
          id: "66130500816",
          name: "dewfe",
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
          id: "66130500817",
          name: "Koese",
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
          id: "66130500818",
          name: "wfadf",
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
          id: "66130500819",
          name: "ewfds",
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
          id: "66130500820",
          name: "DEgsaef",
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
          id: "66130500821",
          name: "ewadfa",
          department: "SIT",
          jobTitle: "HR Management",
          position: "Senior Consultant",
          address: "No.xxx,St.Mary St, Tamwe Tsp, BKK, Thai",
          contactNo: "09xxxxxxxxxx",
          salary: "50000$",
          degree: "High School Diploma",
          startDate: "Jan 2020",
        },
      ];
      const emp = data.find((emp) => emp.id == id);
      setEmployee(emp);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  const handleClick = () => {
    navigate(`/employ/employupdate`);
  };

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      <main className="pt-20 px-4 md:px-20">
        <body className="lg:flex items-center justify-between xl:justify-around">
          <div className="flex justify-center">
            <EmployeeCard  employee={employee} />
          </div>

          <article className="pt-5 text-[#7F483C] lg:px-3">
            <h2 className=" text-[17px] text-black md:text-[20px] font-geologica mb-3">
              Work History
            </h2>
            
            <div className="border rounded-md grid grid-cols-1 lg:grid-cols-2 divide-x ">
              {/* Left Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Job Title</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    HR MANAGEMENT
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Position</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    Senior Consultant
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Employer name</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    Koe Koe
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Department</p>
                  <p className="text-[17px] md:text-[20px] font-georama">SIT</p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Start Date</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    Jan 2020
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Address</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    No.xxx, St.Mary St, Tamwe Tsp, BKK, Thai
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Contact No.</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    09xxxxxxxxxx
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Salary</p>
                  <p className="text-[17px] md:text-[20px] font-georama">50000$</p>
                </div>
                <div>
                  <p className="font-opensans text-[10px] md:text-[12px]">Degree level</p>
                  <p className="text-[17px] md:text-[20px] font-georama">
                    High School Diploma
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
