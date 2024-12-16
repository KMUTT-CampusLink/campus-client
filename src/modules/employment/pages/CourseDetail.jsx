import React, { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import CourseDeletePopUp from "../components/CourseDeletePopUp";
import SectionCard from "../components/SectionCard";
import SectionAdd from "../components/SectionAdd";
import { axiosInstance } from "../../../utils/axiosInstance";

const CourseDetail = () => {
  const { code } = useParams();
  const [course, setCourse] = useState();
  const [employee, setEmployee] = useState();
  const [sections, setSections] = useState([]); // fetch data from backend

  const [showDeletePopUp, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchCourseSection = async () => {
      try {
        const result = await axiosInstance.get(
          `employ/getCourseSection/${code}`
        );
        setCourse(result.data); // Set course details
        setSections(result.data.section); // Set section details
        setEmployee(result.data.employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        return navigate(`/employ/course`);
      }
    };

    fetchCourseSection();
  }, [code, navigate]);
  console.log(sections);
  console.log(course);

  if (!course) return <p className="mt-5 ml-5">Loading course data...</p>;

  const handleClickback = () => {
    navigate(`/employ/course`);
  };
  const handleClick = () => {
    navigate(`/employ/courseUpdate/${course.code}`);
  };
  const handleDeleteClick = () => {
    setShowDelete(true);
  };
  const handleClosePopup = () => {
    setShowDelete(false);
  };
  const handleAddClick = () => {
    setShowAdd(true);
  };
  const handleClosePopup2 = () => {
    setShowAdd(false);
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-20 md:pt-24 px-7 sm:px-16 lg:px-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="hover:shadow-sm md:h-7"
              onClick={handleClickback}
            />
            <h1 className="text-[#D4A015] font-georama text-xl font-semibold md:text-3xl ml-3 md:ml-9">
              {course.code} - {course.name}
            </h1>
          </div>

          <button
            onClick={handleAddClick}
            className="p-1 border border-black text-[12px] md:text-[16px]  rounded-md shadow-lg hover:shadow-xl transition font-opensans md:h-10 md:w-[130px] w-[100px] flex jusfiy-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1 md:h-5 " />
            Add Section
          </button>
        </div>

        <div className="mt-8">
          {/* {sections.map((section, index) => (
            <SectionCard key={section.id} section={section} />
          ))} */}
          {sections.length > 0 ? (
            sections.map((section, index) => (
              <SectionCard key={index} section={section} />
            ))
          ) : (
            <p>No sections available</p>
          )}
        </div>

        <div className="lg:mt-10 flex justify-around lg:justify-center lg:gap-10">
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

      {showDeletePopUp && <CourseDeletePopUp onClose={handleClosePopup} />}
      {showAdd && <SectionAdd onClose={handleClosePopup2} />}
      {deleteSuccess && <p>Course deleted successfully.</p>}
    </div>
  );
};

export default CourseDetail;
