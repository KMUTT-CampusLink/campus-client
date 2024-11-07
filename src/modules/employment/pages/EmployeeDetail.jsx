import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate} from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import DeletePopUp from "../components/DeletePopUp";
import axios from "axios";


const calculateAge = (dob) => {
  const today = new Date(); // Get today's date
  let age = today.getFullYear() - dob.getFullYear(); // Calculate the difference in years
  const monthDifference = today.getMonth() - dob.getMonth(); // Get the month difference

  // Adjust age if the current month is before the birth month or
  // if it's the same month but the current date is before the birthday
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
    age--; // Subtract one year from the calculated age
  }

  return age; // Return the calculated age
};


const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await fetch('http://localhost:3000/api/employ/getEmp/' + id);
        const jsonResult = await result.json()
        setEmployee(jsonResult);

        if (!jsonResult.faculty) {
          console.error("Faculty data missing. Redirecting to main page.");
          navigate(`/employ`);
        }
      }
      catch (error) {
        console.error("Error fetching employee data:", error);
      }

    };
    fetchEmployee();
  }, [id,navigate]);

  console.log(employee);

  if (!employee) return <p>Loading employee data...</p>;


  const dobS = employee.date_of_birth;
  const dob = new Date(dobS);
  const age = calculateAge(dob);
 


  const handleClickback = () => {
    navigate(`/employ/employee`);
  };
  const handleClick = () => {
    navigate(`/employ/employeeUpdate/${employee.id}`);
  };
  const handleDeleteClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`employ/deleteEmp/${id}`);
      console.log("Delete successful");
        setDeleteSuccess(true);
        setShowPopup(false);
        navigate(`/employ/employee`); // Redirect to employee list or desired page

    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-16 md:pt-20 px-4 md:px-20">
        <FontAwesomeIcon icon={faArrowLeft} className="hover:shadow-sm md:h-7" onClick={handleClickback} />
        <div className="lg:flex lg:justify-center lg:items-center lg:gap-7 xl:gap-20"> 
          <div className="flex justify-center">
            <EmployeeCard employee={employee} />
          </div>

          <article className="pt-5 text-[#7F483C] lg:px-3">
            <h2 className=" text-[15px] text-black md:text-[20px] font-geologica mb-3">
              Work History
            </h2>

            <div className="border lg:w-[700px] border-[#939393] rounded-md grid grid-cols-1 sm:grid-cols-2  sm:divide-x divide-[#939393] ">
              {/* Left Side */}
              <div className="p-5 space-y-2 md:space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Employee-ID</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.id}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Name</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.firstname} {employee.midname} {employee.lastname}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Faculty</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.faculty.name}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Job-title</p>
                  <p className="text-[15px] md:text-[20px] font-georama">{employee.job_title}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Position</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.position}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Salary</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.salary}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Gender</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.gender}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Age</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {age}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Identification</p>
                  <p className="text-[15px] md:text-[20px] font-georama">{employee.identification_no}</p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Contact</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.phone}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">Address</p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {employee.address}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
          <button className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm" onClick={handleClick}>Edit</button>
          <button type="button" onClick={handleDeleteClick} className="bg-[#EC5A51] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Delete</button>
        </div>
      </main>

      {showPopup && <DeletePopUp  a= {() => handleDelete(employee.id)} onClose={handleClosePopup} />}
      {deleteSuccess && <p>Employee deleted successfully.</p>}
    </div>
  );
};

export default EmployeeDetail;
