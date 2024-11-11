import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../utils/axiosInstance";
axiosInstance;

const ITEMS_PER_PAGE = 12;
const StudentGrid = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedStudents = students.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get(`employ/getStu`);
      setStudents(result.data);
    };
    fetchData();
  }, []);

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
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="hover:shadow-sm md:h-7 "
              onClick={handleClickback}
            />
            <input
              className="bg-[#F2F2F2] outline-none transition hover:shadow-md w-3/5 md:w-3/4 text-[12px] md:text-[16px] font-georama  md:h-10 h-7 rounded-lg pl-3 "
              type="text"
              id="search"
              placeholder="Search"
            ></input>
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
          {selectedStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="  rounded-full w-6 h-7 transition hover:shadow-xl shadow-sm"
          >
            {currentPage > 1 && <FontAwesomeIcon icon={faLessThan} />}
          </button>
          <span className="px-4 py-2 md:text-lg ">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className=" rounded-full w-6 h-7 transition hover:shadow-xl shadow-sm"
          >
            {currentPage < totalPages && (
              <FontAwesomeIcon icon={faGreaterThan} />
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentGrid;
