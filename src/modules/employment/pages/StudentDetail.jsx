import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import SDeletePopUp from "../components/SDeletePopUp";
import { axiosInstance } from "../../../utils/axiosInstance";

const calculateAge = (dob) => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
};

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudents] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      //debugger;
      try {
        const result = await axiosInstance.get(`employ/getStu/${id}`);
        setStudents(result.data);
        // debugger;
        if (!result.data.uni_batch || result.status == 404) {
          console.error("Faculty data missing. Redirecting to main page.");
          navigate(`/employ/student`);
        }
      } catch (error) {
        //console.error("Error fetching student data:", error);
        navigate(`/employ/student`);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  console.log(student);

  if (!student) return <p>Loading student data...</p>;

  const dobS = student.date_of_birth;
  const dob = new Date(dobS);
  const age = calculateAge(dob);

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

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`employ/deleteStu/${id}`);
      console.log("Delete successful");
      setDeleteSuccess(true);
      setShowPopup(false);
      navigate(`/employ/student`);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-16 md:pt-20 px-4 md:px-20">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="hover:shadow-sm md:h-7"
          onClick={handleClickback}
        />
        <div className="lg:flex lg:justify-center lg:gap-7 xl:gap-20 lg:items-center ">
          <div className="flex justify-center">
            <StudentCard student={student} />
          </div>

          <article className="pt-5 text-[#7F483C] lg:px-3">
            <h2 className=" text-[15px] text-black md:text-[20px] font-geologica mb-3">
              Student Information
            </h2>

            <div className=" border lg:w-[700px] border-[#939393] rounded-md grid grid-cols-1 sm:grid-cols-2  sm:divide-x divide-[#939393] ">
              {/* Left Side */}
              <div className="p-5 space-y-2 md:space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Student-ID
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.id}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Name
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.firstname} {student.midname} {student.lastname}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Program
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.degree.name}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Program Batch
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.program_batch.batch_no}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    University Batch
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.uni_batch.batch_no}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Age
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {age}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Gender
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.gender}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Identification
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.identification_no}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Contact
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.phone}
                  </p>
                </div>
                <div>
                  <p className="font-opensans text-[8px] md:text-[12px] text-[#1A4F6E]">
                    Address
                  </p>
                  <p className="text-[15px] md:text-[20px] font-georama">
                    {student.address.address} {student.address.sub_district}{" "}
                    {student.address.district} {student.address.province}{" "}
                    {student.address.postal_code}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
          <button
            className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
            onClick={handleClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="bg-[#EC5A51] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </main>

      {showPopup && (
        <SDeletePopUp
          a={() => handleDelete(student.id)}
          onClose={handleClosePopup}
        />
      )}
      {deleteSuccess && <p>Student deleted successfully.</p>}
    </div>
  );
};

export default StudentDetail;
